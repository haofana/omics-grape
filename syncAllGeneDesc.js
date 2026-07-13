/* eslint-disable */
const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

// 仅两张已有description字段的表
const tableModels = [
  { name: "fruitFirmness2", model: db.fruitFirmness2 },
  { name: "fruitShape2", model: db.fruitShape2 },
];

// 数组分批切割工具函数，每批30000个（低于32767阈值）
function chunkArray(arr, chunkSize = 30000) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}

async function syncTargetTableDesc() {
  console.log("=== 仅同步 fruitFirmness2 / fruitShape2 的description ===");
  // 1. 预加载全部代谢基因映射
  const metaAll = await db.fruitMetabolism.findMany({
    select: { gene_id: true, description: true },
  });
  const descMap = new Map();
  const validGeneList = [];
  metaAll.forEach((m) => {
    if (m.gene_id) {
      descMap.set(m.gene_id, m.description);
      validGeneList.push(m.gene_id);
    }
  });
  console.log(`加载代谢基因映射共 ${descMap.size} 条`);

  if (validGeneList.length === 0) {
    console.log("无有效gene_id，同步结束");
    await db.$disconnect();
    return;
  }

  // 切割gene数组，分批处理，避免IN参数超限
  const geneChunks = chunkArray(validGeneList, 30000);

  // 循环两张目标表
  for (const item of tableModels) {
    const { name: table, model } = item;
    console.log(`\n正在处理表：${table}`);
    let totalUpdate = 0;

    // 遍历每一批gene片段
    for (const geneBatch of geneChunks) {
      console.log(`当前批次gene数量：${geneBatch.length}`);
      let skip = 0;
      const pageSize = 1000;

      while (true) {
        // 本批次内分页查询
        const rows = await model.findMany({
          skip,
          take: pageSize,
          where: { gene_id: { in: geneBatch } },
        });
        if (rows.length === 0) break;

        // 逐条对比更新
        for (const row of rows) {
          const targetDesc = descMap.get(row.gene_id);
          // 描述一致则跳过，不一致直接覆盖赋值
          if (targetDesc === row.description) continue;

          await model.update({
            where: { no: row.no },
            data: { description: targetDesc },
          });
          totalUpdate++;
        }
        skip += pageSize;
        console.log(`表${table}：本批次已处理${skip}条，累计更新${totalUpdate}条`);
      }
    }
    console.log(`表${table} 全部批次完成，合计更新 ${totalUpdate} 条记录`);
  }

  console.log("\n==== 两张目标表同步完成 ====");
  await db.$disconnect();
}

syncTargetTableDesc().catch(async (err) => {
  console.error("同步失败完整堆栈：", err);
  await db.$disconnect();
  process.exit(1);
});
