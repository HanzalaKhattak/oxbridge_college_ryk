import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient(
  process.env.NODE_ENV === 'development' ? { log: ['error', 'warn'] } : {}
);

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
