// import { prisma } from "./prisma"
// import bcrypt from "bcryptjs"
// import type { User, Chats, Message } from "@prisma/client"

// export async function hashPassword(password: string): Promise<string> {
//     return await bcrypt.hash(password, 12)
// }

// export async function verifyPassword(password: string, hashPassword: string): Promise<boolean>{
//     return await bcrypt.compare(password, hashPassword)
// }

// export async function createUser(
//         email: string,
//         password: string
//     ): Promise<User | null> {
//     try {
//         const existingUser = await prisma.user.findUnique({
//             where: { email }
//         })

//         if (existingUser) {
//             return null
//         }

//         const hashedPassword = await hashPassword(password)

//         const user = await prisma.user.create({
//             data: {
//                 email,
//                 password: hashedPassword
//             }
//         })

//         return user
//     } catch (error) {
//         console.log(error)
//         return null
//     }
// }

// export async function findUserByEmail(email: string): Promise<User | null> {
//     try {
//         return await prisma.user.findUnique({
//             where: {
//                 email
//             }
//         })
//     } catch (error) {
//         console.error('Error finding user by email:', error)
//         return null
//     }
// }

// export async function updateUser(
//     id: number,
//     data: { email: string, name: string, avator: string}
// ): Promise<User | null> {
//     try {
//         const updateUser = await prisma.user.update({
//             where: { id: id },
//             data: data
//         })
//         return updateUser
//     } catch(error) {
//         console.error("ユーザー更新エラー：" + error)
//         return null
//     }
// }

// export async function createChats(
//     userId: number
// ): Promise<Chats | null> {
//     try {
//         const chats = await prisma.chats.create({
//             data: { userId }
//         })
//         return chats
//     } catch(error) {
//         console.error("チャット作成エラー：" + error)
//         return null
//     }
// }

// export async function getChats(
//     userId: number
// ) {
//     try {
//         const chat = await prisma.chats.findMany({
//             where: { userId }
//         })
//         return chat
//     } catch(error) {
//         console.error("チャット取得エラー：" + error)
//         return null
//     }
// }

// export async function getMessages(
//     chatsId: number,
//     userId: number
// ) {
//     try {
//         const messages = await prisma.message.findMany({
//             where: {
//                 chatsId: chatsId,
//                 userId: userId
//             }
//         })
//         return messages
//     } catch(error) {
//         console.error("メッセージ取得エラー" + error)
//         return null
//     }
// }

// export async function createMessage(
//     userId: number,
//     chatsId: number,
//     role: string,
//     content: string
// ): Promise<Message | null> {
//     try {
//         const message = await prisma.message.create({
//             data: {
//                 userId,
//                 chatsId,
//                 role,
//                 content
//             }
//         })
//         return message
//     } catch (error) {
//         console.error("メッセージ作成エラー：" + error)
//         return null
//     }
// }

import { getPrismaClient } from "./prisma"
import bcrypt from "bcryptjs"
import pkg from "@prisma/client"
const { User, Chats, Message } = pkg
import type { User as UserType, Chats as ChatsType, Message as MessageType } from "@prisma/client"

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashPassword: string): Promise<boolean>{
    return await bcrypt.compare(password, hashPassword)
}

export async function createUser(
        email: string,
        password: string,
        platform?: App.Platform
    ): Promise<UserType | null> {
    try {
        const prisma = getPrismaClient(platform)
        
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return null
        }

        const hashedPassword = await hashPassword(password)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })

        return user
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function findUserByEmail(email: string, platform?: App.Platform): Promise<UserType | null> {
    try {
        const prisma = getPrismaClient(platform)
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    } catch (error) {
        console.error('Error finding user by email:', error)
        return null
    }
}

export async function updateUser(
    id: number,
    data: { email: string, name: string, avator: string},
    platform?: App.Platform
): Promise<UserType | null> {
    try {
        const prisma = getPrismaClient(platform)
        const updateUser = await prisma.user.update({
            where: { id: id },
            data: data
        })
        return updateUser
    } catch(error) {
        console.error("ユーザー更新エラー：" + error)
        return null
    }
}

export async function createChats(
    userId: number,
    platform?: App.Platform
): Promise<ChatsType | null> {
    try {
        const prisma = getPrismaClient(platform)
        const chats = await prisma.chats.create({
            data: { userId }
        })
        return chats
    } catch(error) {
        console.error("チャット作成エラー：" + error)
        return null
    }
}

export async function getChats(
    userId: number,
    platform?: App.Platform
) {
    try {
        const prisma = getPrismaClient(platform)
        const chat = await prisma.chats.findMany({
            where: { userId }
        })
        return chat
    } catch(error) {
        console.error("チャット取得エラー：" + error)
        return null
    }
}

export async function getMessages(
    chatsId: number,
    userId: number,
    platform?: App.Platform
) {
    try {
        const prisma = getPrismaClient(platform)
        const messages = await prisma.message.findMany({
            where: {
                chatsId: chatsId,
                userId: userId
            }
        })
        return messages
    } catch(error) {
        console.error("メッセージ取得エラー" + error)
        return null
    }
}

export async function createMessage(
    userId: number,
    chatsId: number,
    role: string,
    content: string,
    platform?: App.Platform
): Promise<MessageType | null> {
    try {
        const prisma = getPrismaClient(platform)
        const message = await prisma.message.create({
            data: {
                userId,
                chatsId,
                role,
                content
            }
        })
        return message
    } catch (error) {
        console.error("メッセージ作成エラー：" + error)
        return null
    }
}