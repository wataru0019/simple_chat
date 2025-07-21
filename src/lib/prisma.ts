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

import pkg from "@prisma/client"
const { PrismaClient } = pkg
import { PrismaD1 } from "@prisma/adapter-d1"
import { dev } from "$app/environment"

interface CustomGlobal {
    prisma?: PrismaClient 
}

const globalForPrisma = globalThis as CustomGlobal

// Cloudflare環境用のPrismaクライアント作成関数
export function getPrismaClient(platform?: App.Platform): PrismaClient {
    if (platform?.env?.DB) {
        // Cloudflare環境（D1使用）
        const adapter = new PrismaD1(platform.env.DB)
        return new PrismaClient({ adapter })
    } else {
        // ローカル環境（SQLite使用）
        if (globalForPrisma.prisma) {
            return globalForPrisma.prisma
        }
        
        const client = new PrismaClient()
        
        if (dev) {
            globalForPrisma.prisma = client
        }
        
        return client
    }
}

// ローカル開発用のデフォルトクライアント（後方互換性のため）
export const prisma: PrismaClient = globalForPrisma.prisma ?? new PrismaClient()

if (dev) {
    globalForPrisma.prisma = prisma
}