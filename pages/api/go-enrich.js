import fs from 'fs/promises';
import path from 'path';

// ================= 全局缓存与懒加载机制 =================
let cachedData = null;

async function loadGOData() {
  if (cachedData) return cachedData; // 命中缓存，直接返回

  console.log("⏳ 首次加载 GO 数据到内存中...");

  // 读取 JSON 文件 (请确保文件放在项目根目录的 /data 文件夹下)
  const gene2goPath = path.join(process.cwd(), 'data', 'gene2go.json');
  const goInfoPath = path.join(process.cwd(), 'data', 'goInfo.json');

  const [gene2goRaw, goInfoRaw] = await Promise.all([
    fs.readFile(gene2goPath, 'utf-8'),
    fs.readFile(goInfoPath, 'utf-8')
  ]);

  const gene2go = JSON.parse(gene2goRaw);
  const goInfo = JSON.parse(goInfoRaw);
  const backgroundGenes = Object.keys(gene2go);
  const bgSet = new Set(backgroundGenes);

  // 构建反向索引：GO -> 基因列表
  const go2gene = {};
  Object.entries(gene2go).forEach(([gene, goList]) => {
    goList.forEach(go => {
      if (!go2gene[go]) go2gene[go] = [];
      go2gene[go].push(gene);
    });
  });

  // 预计算：每个 GO 在背景基因集中的总基因数 (极大提升后续计算速度)
  const goBgCount = {};
  Object.keys(go2gene).forEach(goId => {
    goBgCount[goId] = go2gene[goId].filter(g => bgSet.has(g)).length;
  });

  cachedData = { gene2go, goInfo, bgSet, go2gene, goBgCount, N: bgSet.size };
  console.log(`✅ GO 数据加载完成！背景基因数: ${cachedData.N}, GO terms: ${Object.keys(go2gene).length}`);

  return cachedData;
}

function lnGamma(z) {
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
  z -= 1;
  const g = 7;
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}
function lnComb(n, k) {
  if (k < 0 || k > n) return -Infinity;
  return lnGamma(n + 1) - lnGamma(k + 1) - lnGamma(n - k + 1);
}
function calculatePValue(k, K, n, N) {
  let pValue = 0;
  const maxK = Math.min(K, n);
  for (let i = k; i <= maxK; i++) {
    const logP = lnComb(K, i) + lnComb(N - K, n - i) - lnComb(N, n);
    pValue += Math.exp(logP);
  }
  return Math.min(pValue, 1.0);
}
const fdrCorrection = (pValues) => {
  const m = pValues.length;
  if (m === 0) return [];
  const indexed = pValues.map((p, idx) => ({ p, idx }));
  indexed.sort((a, b) => a.p - b.p);
  const qValues = new Array(m);
  for (let k = 0; k < m; k++) qValues[k] = indexed[k].p * m / (k + 1);
  for (let k = m - 2; k >= 0; k--) qValues[k] = Math.min(qValues[k], qValues[k + 1]);
  const res = new Array(m);
  indexed.forEach((item, k) => { res[item.idx] = Math.min(qValues[k], 1); });
  return res;
};

// ================= API Handler =================
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { geneList } = req.body;
    if (!Array.isArray(geneList) || geneList.length === 0) {
      return res.status(400).json({ error: "geneList is required" });
    }

    // 1. 加载数据 (仅首次请求会读取文件，后续全走内存)
    const { goInfo, bgSet, go2gene, goBgCount, N } = await loadGOData();

    // 2. 清洗输入数据
    const inputSet = new Set(geneList.filter(g => bgSet.has(g)));
    const inputGenes = Array.from(inputSet);
    if (inputGenes.length === 0) return res.status(200).json({ results: [] });

    const n = inputGenes.length;
    const rawResults = [];
    const pValueList = [];

    // 3. 富集计算
    Object.keys(go2gene).forEach(goId => {
      const goGeneSet = go2gene[goId];
      let a = 0;
      const matchedGenes = [];

      // 快速遍历查找
      for (const g of goGeneSet) {
        if (inputSet.has(g)) {
          a++;
          matchedGenes.push(g);
        }
      }

      if (a === 0) return; // 未富集

      const K = goBgCount[goId];
      const pVal = calculatePValue(a, K, n, N);
      const info = goInfo[goId] || { name: goId, category: "BP" };

      rawResults.push({
        goId, goName: info.name, category: info.category,
        count: a, geneList: matchedGenes, pValue: pVal
      });
      pValueList.push(pVal);
    });

    // 4. FDR 校正与排序
    const fdrList = fdrCorrection(pValueList);
    rawResults.forEach((item, idx) => { item.fdr = fdrList[idx]; });
    rawResults.sort((x, y) => x.pValue - y.pValue);

    return res.status(200).json({ results: rawResults });
  } catch (err) {
    console.error("GO Enrichment Error:", err);
    return res.status(500).json({ error: "Internal server error", detail: err.message });
  }
}
