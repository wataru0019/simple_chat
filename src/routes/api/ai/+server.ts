// import { GoogleGenAI } from "@google/genai";
// import { json } from '@sveltejs/kit';
// import { GOOGLE_GEMINI_API_KEY } from "$env/static/private";
// import { createChats, createMessage } from "$lib/database.js";

// const ai = new GoogleGenAI({ apiKey: GOOGLE_GEMINI_API_KEY });

// async function invokeGemini(input: string, messages: []){
//     const message_json = JSON.stringify({messages})
//     const prompt = `
//     以下の会話履歴を記憶し、ユーザーからのインプットに回答せよ。

//     ユーザーインプット： ${input}
//     会話履歴： ${message_json}
//     `
//     const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash-lite-preview-06-17",
//         contents: prompt
//     })
//     return response.text
// }

// export async function POST({ request }) {
//     const { userId, chatsId, input, messages } = await request.json();
//     const resAI = await invokeGemini(input, messages)
//     if ( chatsId === 0 ) {
//        const newChats = await createChats(userId)
//        const newUserMessage = await createMessage(userId, newChats?.id, "user", input)
//        const newAiMessage = await createMessage(userId, newChats?.id, "assistant", resAI)
//     } else {
//         const newUserMessage = await createMessage(userId, chatsId, "user", input)
//         const newAiMessage = await createMessage(userId, chatsId, "assistant", resAI)
//     }
//     return json({ message: resAI })
// }

import { GoogleGenAI } from "@google/genai";
import { json } from '@sveltejs/kit';
import { createChats, createMessage } from "$lib/database.js";
import type { RequestHandler } from './$types';

async function invokeGemini(input: string, messages: [], apiKey: string){
    const ai = new GoogleGenAI({ apiKey });
    
    const message_json = JSON.stringify({messages})
    const prompt = `
    以下の会話履歴を記憶し、ユーザーからのインプットに回答せよ。

    ユーザーインプット： ${input}
    会話履歴： ${message_json}
    `
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite-preview-06-17",
        contents: prompt
    })
    return response.text
}

export const POST: RequestHandler = async ({ request, platform }) => {
    try {
        // 環境変数の取得（Cloudflare対応）
        const apiKey = platform?.env?.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY;
        
        if (!apiKey) {
            return json({ error: "GOOGLE_GEMINI_API_KEY が設定されていません" }, { status: 500 });
        }

        const { userId, chatsId, input, messages } = await request.json();
        const resAI = await invokeGemini(input, messages, apiKey);
        
        if (chatsId === 0) {
            const newChats = await createChats(userId, platform);
            if (newChats) {
                const newUserMessage = await createMessage(userId, newChats.id, "user", input, platform);
                const newAiMessage = await createMessage(userId, newChats.id, "assistant", resAI, platform);
            }
        } else {
            const newUserMessage = await createMessage(userId, chatsId, "user", input, platform);
            const newAiMessage = await createMessage(userId, chatsId, "assistant", resAI, platform);
        }
        
        return json({ message: resAI });
    } catch (error) {
        console.error("AI API エラー:", error);
        return json({ error: "AI応答の生成に失敗しました" }, { status: 500 });
    }
};