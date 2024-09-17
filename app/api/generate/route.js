import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
    You are a flashcard creator. Your goal is to generate educational flashcards based on input content using OpenAI's API. 
    The flashcards should include a question on the front side and a concise answer on the back side. 
    Ensure that each question is clear, relevant to the topic, and well-suited for review. 
    The answer should be precise and factual, enhancing the learning process for the user. 
    Prioritize simple language, unless the user specifies otherwise, and tailor flashcards to different difficulty levels or 
    specific subjects based on user requests. ONLY GENERATE 10 FLASH CARDS.

    Return in the following JSON format.
    {
        "flashcards": [
            {
                "front": str
                "back": str
            }
        ]
    }
`

export async function POST(req) {
    const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages:[
            { role: "system", content: systemPrompt},
            { role: "user", content: data}
        ],
        model: "gpt-4o-mini",
        response_format: {type: 'json_object'}
    })

    console.log(`\n\nCompletion: ${completion.choices[0].message.content}\n\n`)

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)
}