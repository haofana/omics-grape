import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// 加载本地环境变量（.env.local 中的 DATABASE_URL）
dotenv.config({ path: '.env.local' });

// 解决 Next.js 热重载重复创建 Client
declare global {
  var prisma: PrismaClient | undefined;
}

// 5.x 初始化方式（无需适配器，自动读取 DATABASE_URL）
const prisma = globalThis.prisma || new PrismaClient({
  log: ['query', 'error'], // 调试用
});

// 开发环境缓存 Client
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// 导出 Client 实例
export default prisma;
