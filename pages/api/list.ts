import type { NextApiRequest, NextApiResponse } from 'next';
// 导入封装好的 Prisma 客户端
import db from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// 定义返回数据的类型（TS 类型校验，JS 项目可删除）
type Data = {
  success: boolean;
  data?: any[]; // 实际可替换为 germplasm 具体类型
  total?: number;
  msg?: string;
};

// Page Router 的 API 接口核心：默认导出 async 函数，接收 req/res
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // 只允许 GET 请求（可选，限制请求方式）
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, msg: '仅支持 GET 请求' });
  }

  try {
    // 1. 获取前端传参（如分页参数 page、size，条件参数 variety 等）
    const { page = 1, size = 10, variety } = req.query;
    const skip = (Number(page) - 1) * Number(size); // 计算分页跳过数

    // 2. 构建查询条件（模糊查询品种名称，可扩展其他条件）
    const whereCondition = variety
      ? { variety: { contains: String(variety), mode: Prisma.QueryMode.insensitive } } // 不区分大小写模糊查
      : {};

    // 3. 执行数据库查询（Prisma 语法，适配 germplasm 模型）
    // 同时查询列表和总条数（方便分页）
    const [list, total] = await Promise.all([
      db.germplasm.findMany({
        where: whereCondition, // 查询条件
        skip: skip, // 分页跳过
        take: Number(size), // 每页条数
        orderBy: { id: 'asc' }, // 按导入时间倒序
      }),
      db.germplasm.count({ where: whereCondition }), // 统计符合条件的总条数
    ]);

    // 4. 返回成功数据
    return res.status(200).json({
      success: true,
      data: list,
      total: total,
    });
  } catch (error) {
    // 5. 捕获错误，返回失败信息
    console.error('葡萄数据查询失败：', error);
    return res.status(500).json({
      success: false,
      msg: '服务器内部错误，查询失败',
    });
  }
}
