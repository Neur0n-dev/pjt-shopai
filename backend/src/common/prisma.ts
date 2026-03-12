import { PrismaClient } from '../generated/prisma/client';

// ========================
// Prisma 클라이언트 싱글톤
// ========================
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'dev' ? ['query', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'prod') globalForPrisma.prisma = prisma;

export default prisma;
