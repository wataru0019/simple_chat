import { prisma } from "./prisma"
import bcrypt from "bcryptjs"
import type { User } from "@prisma/client"

export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashPassword: string): Promise<boolean>{
    return await bcrypt.compare(password, hashPassword)
}

export async function createUser(
        email: string,
        password: string
    ): Promise<User | null> {
    try {
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

export async function findUserByEmail(email: string): Promise<User | null> {
    try {
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