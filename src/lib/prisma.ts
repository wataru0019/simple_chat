// import { PrismaClient } from "@prisma/client"
// import { dev } from "$app/environment"

// interface CustomGlobal {
//     prisma?: PrismaClient 
// }

// const globalForPrisma = globalThis as CustomGlobal

// export const prisma: PrismaClient = globalForPrisma.prisma ?? new PrismaClient();

// if (dev) {
//     globalForPrisma.prisma = prisma;
// }


import pkg from '@prisma/client'
import adapterPkg from '@prisma/adapter-d1'

const { PrismaClient } = pkg
const { PrismaD1 } = adapterPkg

let prisma: pkg.PrismaClient

declare global {
  var __prisma: pkg.PrismaClient | undefined
}

export function getPrisma(D1?: D1Database): pkg.PrismaClient {
  if (D1) {
    // Cloudflare D1環境
    const adapter = new PrismaD1(D1)
    return new PrismaClient({ adapter })
  }

  // ローカル開発環境
  if (globalThis.__prisma) {
    return globalThis.__prisma
  }

  globalThis.__prisma = new PrismaClient()
  return globalThis.__prisma
}

// ローカル開発用のデフォルトエクスポート
if (!prisma) {
  prisma = getPrisma()
}

export default prisma