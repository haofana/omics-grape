/* eslint-disable */
const fs = require('fs');
const path = require('path');

// 读取静态注释文件
const DATA_DIR = path.join(process.cwd(), 'data')
const gene2ko = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'gene2ko.json'), 'utf8'))
const keggRaw = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'kegg_enrich_result.json'), 'utf8'))

// 构建通路映射
const keggMap = new Map()
const totalAllGene = new Set(Object.keys(gene2ko)).size
keggRaw.forEach(item => {
  keggMap.set(item.pathwayId, {
    name: item.pathwayName,
    allGenes: new Set(item.geneList),
    total: item.geneList.length
  })
})

// 组合数计算
function comb(n, k) {
  if (k < 0 || k > n) return 0
  if (k === 0 || k === n) return 1
  k = Math.min(k, n - k)
  let res = 1
  for (let i = 1; i <= k; i++) {
    res = res * (n - k + i) / i
  }
  return res
}

// 超几何分布P值
function calcHyperP(N, M, k, x) {
  let pSum = 0
  const maxX = Math.min(M, k)
  for (let i = 0; i < x; i++) {
    pSum += comb(k, i) * comb(N - k, M) / comb(N, M)
  }
  return 1 - pSum
}

// FDR校正
function fdrAdjust(pList) {
  const arr = pList.map((p, idx) => ({ p, idx })).sort((a, b) => a.p - b)
  const m = arr.length
  for (let i = 0; i < m; i++) {
    arr[i].fdr = arr[i].p * m / (i + 1)
  }
  return arr.sort((a, b) => a.idx).map(item => item.fdr)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, msg: '仅支持POST请求' })
  }
  try {
    const { geneList, fdrThreshold = 0.05, topNum = 50 } = req.body
    if (!Array.isArray(geneList) || geneList.length === 0) {
      return res.json({ success: false, msg: '基因列表不能为空' })
    }
    const inputGenes = [...new Set(geneList)]
    const enrichRaw = []

    for (const [pathId, info] of keggMap) {
      const hitGenes = inputGenes.filter(g => info.allGenes.has(g))
      const hitCount = hitGenes.length
      if (hitCount === 0) continue
      const p = calcHyperP(totalAllGene, inputGenes.length, info.total, hitCount)
      enrichRaw.push({
        pathwayId: pathId,
        pathwayName: info.name,
        hitCount,
        bgCount: info.total,
        pValue: p,
        hitGenes
      })
    }

    // FDR校正+过滤排序
    const fdrList = fdrAdjust(enrichRaw.map(item => item.pValue))
    let result = enrichRaw.map((item, idx) => ({ ...item, fdr: fdrList[idx] }))
      .filter(item => item.fdr <= fdrThreshold)
      .sort((a, b) => a.fdr - b.fdr)
      .slice(0, topNum)

    return res.json({ success: true, data: result })
  } catch (err) {
    console.error('KEGG富集计算错误：', err)
    return res.json({ success: false, msg: '富集计算失败' })
  }
}
