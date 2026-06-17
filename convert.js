/* eslint-disable */
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const ROOT_DIR = process.cwd();
const PUBLIC_FILE_DIR = path.join(ROOT_DIR, 'raw_data');
const OUT_DIR = path.join(ROOT_DIR, 'data');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

// ================= 1. 解析 OBO 生成 goInfo.json =================
async function parseOBO() {
  const oboPath = path.join(PUBLIC_FILE_DIR, 'go-basic.obo');
  if (!fs.existsSync(oboPath)) {
    console.error(`❌ 未找到 go-basic.obo！请将其放入 ${PUBLIC_FILE_DIR}`);
    process.exit(1);
  }
  console.log('⏳ 正在解析 go-basic.obo...');
  const rl = readline.createInterface({ input: fs.createReadStream(oboPath), crlfDelay: Infinity });
  const goInfo = {};
  let id = '', name = '', ns = '', inTerm = false;
  const catMap = { biological_process: 'BP', molecular_function: 'MF', cellular_component: 'CC' };

  for await (const line of rl) {
    if (line === '[Term]') { inTerm = true; id = ''; name = ''; ns = ''; }
    else if (line === '' && inTerm) {
      if (id && name && ns) goInfo[id] = { name, category: catMap[ns] || 'BP' };
      inTerm = false;
    } else if (inTerm) {
      if (line.startsWith('id: ')) id = line.slice(4);
      else if (line.startsWith('name: ')) name = line.slice(6);
      else if (line.startsWith('namespace: ')) ns = line.slice(11);
    }
  }
  fs.writeFileSync(path.join(OUT_DIR, 'goInfo.json'), JSON.stringify(goInfo, null, 2));
  console.log(`✅ goInfo.json 生成！共 ${Object.keys(goInfo).length} 个 GO terms。\n`);
}

// ================= 2. 解析 BioMart 导出的 TXT/CSV 文件 =================
async function parseBioMartFile() {
  const files = fs.readdirSync(PUBLIC_FILE_DIR);
  // 支持 .txt, .csv, .tsv 格式
  const targetFiles = files.filter(f =>
    f.endsWith('.txt') || f.endsWith('.csv') || f.endsWith('.tsv')
  );

  if (targetFiles.length === 0) {
    console.error(`❌ 在 ${PUBLIC_FILE_DIR} 未找到 .txt / .csv / .tsv 文件！`);
    process.exit(1);
  }

  console.log(`🔍 发现 ${targetFiles.length} 个数据文件，开始解析...\n`);
  const gene2go = {};

  for (const file of targetFiles) {
    const filePath = path.join(PUBLIC_FILE_DIR, file);
    console.log(`📂 正在处理: ${file}`);

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });

    let matchCount = 0;
    let geneIdx = 0; // 默认第1列是基因ID
    let goIdx = 2;   // 默认第3列是GO ID
    let isHeaderParsed = false;

    for await (const line of rl) {
      if (!line.trim()) continue;

      // 智能判断分隔符 (兼容逗号 "," 和 制表符 "\t")
      const separator = line.includes('\t') ? '\t' : ',';
      const cols = line.split(separator).map(c => c.trim().replace(/^"|"$/g, '')); // 去除可能的双引号

      // 1. 解析表头，动态定位列索引
      if (!isHeaderParsed && (line.includes('Gene stable ID') || line.includes('GO term'))) {
        geneIdx = cols.findIndex(c => /gene.*id/i.test(c));
        goIdx = cols.findIndex(c => /go.*accession|go.*id/i.test(c));

        if (geneIdx === -1) geneIdx = 0;
        if (goIdx === -1) goIdx = cols.length - 1; // 兜底用最后一列

        isHeaderParsed = true;
        continue; // 跳过表头行
      }

      // 2. 提取数据
      const geneId = cols[geneIdx];
      const goId = cols[goIdx];

      // 过滤掉没有 GO 注释的行 (如 Vitis15g00095,,)
      if (!geneId || !goId || !goId.startsWith('GO:')) continue;

      // 3. 存入字典 (使用 Set 自动去重)
      if (!gene2go[geneId]) gene2go[geneId] = new Set();
      gene2go[geneId].add(goId);
      matchCount++;
    }

    console.log(`   ↳ 成功提取 ${matchCount} 条基因-GO映射关系。\n`);
  }

  if (Object.keys(gene2go).length === 0) {
    console.error('❌ 未提取到任何数据！请检查文件内容。');
    return;
  }

  // 将 Set 转为 Array
  const result = {};
  for (const [gene, goSet] of Object.entries(gene2go)) {
    result[gene] = Array.from(goSet);
  }

  fs.writeFileSync(path.join(OUT_DIR, 'gene2go.json'), JSON.stringify(result, null, 2));
  console.log(`🎉 全部完成！共提取 ${Object.keys(result).length} 个独立葡萄基因的 GO 注释。`);
  console.log(`📁 输出路径: ${path.join(OUT_DIR, 'gene2go.json')}`);
}

// 执行
(async () => {
  try {
    await parseOBO();
    await parseBioMartFile();
  } catch (err) {
    console.error('❌ 运行出错:', err);
  }
})();
