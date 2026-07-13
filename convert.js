/* eslint-disable */
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// 路径配置
const srcCsv = path.join(__dirname, 'raw_data', 'new.csv');
const dataDir = path.join(__dirname, 'data');
const outGene2Ko = path.join(dataDir, 'gene2ko.json');
const outKo2Path = path.join(dataDir, 'ko2pathway.json');
const outKeggEnrich = path.join(dataDir, 'kegg_enrich_result.json');

// 创建data目录
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

// 存储容器
const gene2ko = {};
const ko2pathway = {};
// 通路：{pid: {pathwayId, pathwayName, genes: []}} 纯数组，无Set
const pathwayMap = {};

fs.createReadStream(srcCsv)
  .pipe(csv())
  .on('data', (row) => {
    const geneId = row['Gene ID'];
    if (!geneId) return;

    const koRaw = row['ko_id'] || '';
    const pathIdRaw = row['pathway_id'] || '';
    const pathNameRaw = row['pathway_definition'] || '';
    if (koRaw === '------' || pathIdRaw === '------') return;

    const koList = koRaw.split(';').map(s => s.trim()).filter(s => s);
    const pathIdList = pathIdRaw.split(';').map(s => s.trim()).filter(s => s);
    const pathNameList = pathNameRaw.split(';').map(s => s.trim()).filter(s => s);

    gene2ko[geneId] = koList;

    // KO -> 通路映射
    koList.forEach(ko => {
      if (!ko2pathway[ko]) ko2pathway[ko] = [];
      pathIdList.forEach(pid => {
        if (!ko2pathway[ko].includes(pid)) ko2pathway[ko].push(pid);
      });
    });

    // 通路基因数组，不用Set，手动去重
    pathIdList.forEach((pid, idx) => {
      const pathName = pathNameList[idx] || 'unknown pathway';
      // 不存在则初始化空数组
      if (!pathwayMap[pid]) {
        pathwayMap[pid] = {
          pathwayId: pid,
          pathwayName: pathName,
          genes: []
        };
      }
      // 数组去重添加，替代Set.add
      if (!pathwayMap[pid].genes.includes(geneId)) {
        pathwayMap[pid].genes.push(geneId);
      }
    });
  })
  .on('end', () => {
    // gene2ko
    fs.writeFileSync(outGene2Ko, JSON.stringify(gene2ko, null, 2), 'utf8');
    console.log(`✅ gene2ko.json 完成，基因：${Object.keys(gene2ko).length}`);

    // ko2pathway
    fs.writeFileSync(outKo2Path, JSON.stringify(ko2pathway, null, 2), 'utf8');
    console.log(`✅ ko2pathway.json 完成，KO：${Object.keys(ko2pathway).length}`);

    // 组装kegg_enrich_result
    const keggEnrichList = [];
    for (const pid in pathwayMap) {
      const item = pathwayMap[pid];
      keggEnrichList.push({
        pathwayId: item.pathwayId,
        pathwayName: item.pathwayName,
        geneCount: item.genes.length,
        geneList: item.genes
      });
    }
    // 按基因数量降序
    keggEnrichList.sort((a, b) => b.geneCount - a.geneCount);
    fs.writeFileSync(outKeggEnrich, JSON.stringify(keggEnrichList, null, 2), 'utf8');
    console.log(`✅ kegg_enrich_result.json 生成，通路总数：${keggEnrichList.length}`);
    console.log('全部文件生成成功！');
  })
  .on('error', (err) => {
    console.error('读取CSV失败：', err);
  });
