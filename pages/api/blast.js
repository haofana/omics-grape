import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

const BLAST_DB_DIR = process.env.NODE_ENV === 'production'
  ? '/home/admin/omics-grape/blastdb' // 服务器路径
  : path.join(process.cwd(), 'blastdb'); // 本地路径
// 解析 BLAST 输出，提取 4 大模块数据
const parseBlastOutput = (raw, dbname) => {
  const lines = raw.split('\n');
  const data = {
    descriptions: [],
    alignments: [],
    graphicHits: [],
    taxonomy: []
  };

  let currentDesc = null;
  let currentAlign = null;
  let inAlign = false;

  // Query 长度
  const queryLenMatch = raw.match(/Query=.*?\s+\((\d+)\s+letters/);
  const queryLen = queryLenMatch ? parseInt(queryLenMatch[1]) : 1000;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trim = line.trim();

    // ==============================
    // 1. 抓 Description（表格）
    // ==============================
    if (trim.startsWith('>') || trim.startsWith('Sequences producing')) {
      if (currentDesc) {
        data.descriptions.push({ ...currentDesc, db: dbname });
        currentDesc = null;
      }
    }
    if (trim.startsWith('>') && trim.length > 5) {
      const name = trim.substring(1).split(/\s+/)[0];
      currentDesc = { name, description: trim.substring(1) };
    }
    if (trim.includes('Score =') && currentDesc) {
      const bit = line.match(/Score =\s*([\d.]+)\s*bits/);
      const e = line.match(/Expect =\s*([\d.e+-]+)/);
      if (bit) currentDesc.bitscore = parseFloat(bit[1]);
      if (e) currentDesc.evalue = parseFloat(e[1]);
    }

    // ==============================
    // 2. 抓 Alignment（比对详情）
    // ==============================
    if (trim.startsWith('>') || trim.startsWith('Query=')) {
      if (currentAlign) data.alignments.push(currentAlign);
      currentAlign = {
        db: dbname,
        header: trim.replace(/^>/, ''),
        query: [], midline: [], subject: []
      };
      inAlign = true;
    }
    if (inAlign && line.trimStart().startsWith('Query')) {
      const qPart = line.match(/Query\s+(\d+)\s+([A-Z-]+)\s+(\d+)/);
      const mid = lines[i+1] || '';
      const sPart = (lines[i+2] || '').match(/Sbjct\s+(\d+)\s+([A-Z-]+)\s+(\d+)/);

      if (qPart) currentAlign.query.push({ pos: qPart[1], seq: qPart[2] });
      currentAlign.midline.push(mid.trimEnd());
      if (sPart) currentAlign.subject.push({ pos: sPart[1], seq: sPart[2] });

      i += 2;
    }

    // ==============================
    // 3. 抓 Graphic 坐标
    // ==============================
    if (line.includes('Identities =') && currentAlign) {
      const prevLines = [
        lines[i-10]||'', lines[i-9]||'', lines[i-8]||'',
        lines[i-7]||'', lines[i-6]||'', lines[i-5]||'',
        lines[i-4]||'', lines[i-3]||'', lines[i-2]||'',
      ].join(' ');

      const qs = prevLines.match(/Query\s+(\d+)/)?.[1];
      const qe = prevLines.match(/\s+(\d+)\s*$/)?.[1];
      const ss = prevLines.match(/Sbjct\s+(\d+)/)?.[1];
      const se = prevLines.match(/Sbjct.+\s+(\d+)\s*$/)?.[1];
      const pid = line.match(/(\d+)%/)?.[1];

      if (qs && qe && ss && se && pid) {
        data.graphicHits.push({
          db: dbname,
          qstart: parseInt(qs),
          qend: parseInt(qe),
          sstart: parseInt(ss),
          send: parseInt(se),
          pident: parseInt(pid)
        });
      }
    }
  }

  if (currentDesc) data.descriptions.push({ ...currentDesc, db: dbname });
  if (currentAlign) data.alignments.push(currentAlign);

  data.taxonomy.push({
    db: dbname,
    lineage: 'Eukaryota > Viridiplantae > Streptophyta > Magnoliopsida > Vitales > Vitaceae > Vitis'
  });

  return data;
};

export default async function handler(req, res) {
  const { sequence, program, dblist, wordSize, evalue, maxTarget } = req.body
  const queryFile = path.join(BLAST_DB_DIR, '_query.fasta')
  fs.writeFileSync(queryFile, `>query\n${sequence}`)

  const fullData = {
    descriptions: [],
    alignments: [],
    graphicHits: [],
    taxonomy: [],
    queryLen: sequence.replace(/\s/g, '').length
  }

  // 遍历用户勾选的所有库
  for (const dbname of dblist) {
    // 自适应路径：本地 / 服务器 都能用
    const db = path.join(BLAST_DB_DIR, dbname)

    await new Promise((resolve) => {
      const child = spawn(program, [
        '-query', queryFile,
        '-db', db,
        '-outfmt', '0',
        // '-outfmt', '6 qseqid sseqid pident length evalue qstart qend sstart send bitscore',
        '-max_target_seqs', maxTarget,
        '-evalue', evalue,    // 比如 1e-5
        '-word_size', wordSize  // 比如 11 或 3
      ])

      let raw = ''
      child.stdout.on('data', d => raw += d.toString())
      child.on('close', () => {
        const parsed = parseBlastOutput(raw, dbname)
        fullData.descriptions.push(...parsed.descriptions)
        fullData.alignments.push(...parsed.alignments)
        fullData.graphicHits.push(...parsed.graphicHits)
        fullData.taxonomy.push(...parsed.taxonomy)
        resolve()
      })
    })
  }

  // 按 E-value 排序
  fullData.descriptions.sort((a, b) => a.evalue - b.evalue)
  fullData.graphicHits.sort((a, b) => a.pident - b.pident)

  res.json(fullData)
}
