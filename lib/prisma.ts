// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'; // 导入 PostgreSQL 适配器
import { Pool } from 'pg'; // 导入 pg 连接池
import dotenv from 'dotenv';

// 加载本地环境变量（.env.local 中的 DATABASE_URL）
dotenv.config({ path: '.env.local' });

// 🌟 核心：创建 pg 连接池 + Prisma 适配器
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // 读取 Neon 数据库连接串
  ssl: { rejectUnauthorized: false }, // 兼容 Neon 的 SSL 连接（必需）
});
const adapter = new PrismaPg(pool); // 创建 Prisma PostgreSQL 适配器

// 扩展全局类型（无 ESLint 报错的 ES 模块风格）
declare global {
  var prisma: PrismaClient | undefined;
}

// 🌟 Prisma 7.x 强制要求：传入 adapter 到构造函数
const prisma = new PrismaClient({
  adapter: adapter, // 必需：传入适配器
  log: ['query', 'error'], // 可选：日志配置
});

// 缓存 Prisma Client，避免 Next.js 热重载重复创建
const db = globalThis.prisma || prisma;
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

export default db;
