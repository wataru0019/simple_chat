import { getChats, getMessages } from '$lib/database.js'

export async function load ({ params, locals }) {
    const chatlist = await getChats(Number(params.chatid))
    const session = await locals.getSession()
    const messages = await getMessages(Number(params.chatid), Number(session?.user?.id))
    console.log(messages)
    return {
        messages: messages
    }
}