import { prisma } from "$lib/prisma";
import { json } from '@sveltejs/kit';
import { createUser } from "$lib/database"

export async function GET() {
    try {
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

export async function POST({ request }) {
    const { email, password } = await request.json();

    const user = await createUser(email, password)

    return json(user)
}