// import { prisma } from "$lib/prisma";
// import { json } from '@sveltejs/kit';
// import { createUser, updateUser } from "$lib/database"

// export async function GET() {
//     try {
//         const users = await prisma.user.findUniqueOrThrow({
//             where: { id: 1 }
//         })
//         return json(users)
//     } catch (error) {
//         console.log(error)
//         const err = { message: "ユーザーが見つかりません" }
//         return json(err)
//     }
// }

// export async function POST({ request }) {
//     const { email, password } = await request.json();

//     const user = await createUser(email, password)

//     return json(user)
// }

// export async function PATCH({ request }) {
//     const { id, email, name, avator } = await request.json()

//     if(!id) {
//         return json({ message: "IDがありません"}, { status: 400 })
//     }
//     const data = {
//         email,
//         name,
//         avator
//     }
//     try {
//         const user = await updateUser(Number(id), data)

//         if(!user) {
//             return json({ message: "ユーザーが見つからないか、更新に失敗しました" }, { status: 404 })
//         }
//         return json(user)
//     } catch(error) {
//         console.error("ユーザー更新エラー：" + error);
//         return json({ message: "ユーザー更新中にエラーが発生しました" }, { status: 500 })
//     }
// }

import { getPrismaClient } from "$lib/prisma";
import { json } from '@sveltejs/kit';
import { createUser, updateUser } from "$lib/database"
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform }) => {
    try {
        const prisma = getPrismaClient(platform)
        const users = await prisma.user.findUniqueOrThrow({
            where: { id: 1 }
        })
        return json(users)
    } catch (error) {
        console.log(error)
        const err = { message: "ユーザーが見つかりません" }
        return json(err)
    }
}

export const POST: RequestHandler = async ({ request, platform }) => {
    const { email, password } = await request.json();

    const user = await createUser(email, password, platform)

    return json(user)
}

export const PATCH: RequestHandler = async ({ request, platform }) => {
    const { id, email, name, avator } = await request.json()

    if(!id) {
        return json({ message: "IDがありません"}, { status: 400 })
    }
    const data = {
        email,
        name,
        avator
    }
    try {
        const user = await updateUser(Number(id), data, platform)

        if(!user) {
            return json({ message: "ユーザーが見つからないか、更新に失敗しました" }, { status: 404 })
        }
        return json(user)
    } catch(error) {
        console.error("ユーザー更新エラー：" + error);
        return json({ message: "ユーザー更新中にエラーが発生しました" }, { status: 500 })
    }
}