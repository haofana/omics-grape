/* eslint-disable */
import type { NextApiRequest, NextApiResponse } from 'next';
// 导入封装好的 Prisma 客户端
import db from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import OSS from 'ali-oss';
import type { PhenomicsFruit, PhenomicsLeaf } from '@prisma/client';

// OSS 配置
const ossClient = new OSS({
  region: process.env.OSS_REGION as string,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID as string,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET as string,
  bucket: process.env.OSS_BUCKET as string,
});

// 生成签名URL
const getSignUrl = async (path: string | null): Promise<string | null> => {
  if (!path) return null;
  try {
    // 强制指定https协议，解决http访问失败问题
    return ossClient.signatureUrl(path.trim(), {
      expires: 3600 * 24,
    });
  } catch (e) {
    console.error('OSS签名失败：', e);
    return null;
  }
};

// 定义返回数据的类型（TS 类型校验，JS 项目可删除）
type Data = {
  success: boolean;
  data?: []; // 实际可替换为 germplasm 具体类型
  total?: number;
  msg?: string;
};
// 定义 params 的类型接口（明确解析后的数据结构）
type QueryParams = Record<string, string | number | boolean | null>;
// interface QueryParams {
//   variety?: string;
//   stage?: string;
//   type?: string;
// }
// 工具函数：归一化查询参数为单个字符串
const getQueryParam = (param: string | string[] | undefined): string => {
  if (typeof param === 'string') {
    return param.trim(); // 去除空格，避免空字符串解析错误
  } else if (Array.isArray(param) && param.length > 0) {
    return param[0].trim();
  }
  return '';
};
// 工具函数：安全解析 JSON 参数（带异常捕获）
const safeParseParams = (paramsStr: string): QueryParams => {
  if (!paramsStr) { // 空字符串直接返回空对象
    return {};
  }
  try {
    // 解析 JSON，并校验类型（确保是对象，不是数组/其他）
    const parsed = JSON.parse(paramsStr);
    return typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch (error) {
    // JSON 解析失败（如格式错误），返回空对象
    console.error('解析 params 失败：', error);
    return {};
  }
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
    const { table, page = 1, size = 10, params = '' } = req.query;
    const paramsStr = getQueryParam(params); // 转为纯 string
    const parsedParams = safeParseParams(paramsStr); // 安全解析 JSON
    const skip = (Number(page) - 1) * Number(size); // 计算分页跳过数

    // 2. 构建查询条件（模糊查询品种名称，可扩展其他条件）
    const where = buildWhere(parsedParams);
    // const where: Record<string, any> = {};
    // if (variety) where.variety = { contains: String(variety), mode: Prisma.QueryMode.insensitive };
    // if (stage) where.stage = stage as string;
    // if (type) where.type = type as string;
    // const whereCondition = {
    //   variety: { contains: String(variety), mode: Prisma.QueryMode.insensitive },
    //   stage: String(stage),
    //   type: String(type)
    // }

    // 3. 执行数据库查询（Prisma 语法，适配 germplasm 模型）

    // 同时查询列表和总条数（方便分页）
    if (table === 'germplasm') {
      const [list, total] = await Promise.all([
        db.germplasm.findMany({ skip, take: Number(size), where, orderBy: { id: 'asc' } }),
        db.germplasm.count({ where: where }),
      ]);
      return res.json({ success: true, data: list as any, total });
    }

    // 果实表
    if (table === 'PhenomicsFruit') {
      const [list, total] = await Promise.all([
        db.phenomicsFruit.findMany({ skip, take: Number(size), where, orderBy: { no: 'asc' } }),
        db.phenomicsFruit.count({ where: where }),
      ]);
      // 🔥 批量生成图片签名URL
      const newList = await Promise.all(
        list.map(async (item: PhenomicsFruit) => ({
          ...item,
          berryPhotos: await getSignUrl(`berry/${item.variety}.png`),
        }))
      );
      return res.json({ success: true, data: newList as any, total });
    }
    // 茎叶表
    if (table === 'PhenomicsLeaf') {
      const [list, total] = await Promise.all([
        db.phenomicsLeaf.findMany({ skip, take: Number(size), where, orderBy: { no: 'asc' } }),
        db.phenomicsLeaf.count({ where: where }),
      ]);
      // 🔥 批量生成图片签名URL
      const newList = await Promise.all(
        list.map(async (item: PhenomicsLeaf) => ({
          ...item,
          youngShootAdaxialSide: await getSignUrl(`leaf/${item.variety} 嫩梢正.png`),
          youngLeafAdaxialSide: await getSignUrl(`leaf/${item.variety} 幼叶正.png`),
          matureLeafAdaxialSide: await getSignUrl(`leaf/${item.variety} 成龄叶正.png`),
        }))
      );
      return res.json({ success: true, data: newList as any, total });
    }

  } catch (error) {
    // 5. 捕获错误，返回失败信息
    console.error('葡萄数据查询失败：', error);
    return res.status(500).json({
      success: false,
      msg: '服务器内部错误，查询失败',
    });
  }
}
// 构建模糊/精准查询条件
const buildWhere = (params: QueryParams): Prisma.JsonObject => {
  const where: Prisma.JsonObject = {};
  for (const key in params) {
    const val = params[key];
    if (val === null || val === undefined || val === '') continue;

    if (typeof val === 'string') {
      where[key] = { contains: val, mode: Prisma.QueryMode.insensitive };
    } else {
      where[key] = val;
    }
  }
  return where;
};
