import openai from "@/utils/openai";
import { NextResponse } from "next/server";

export const maxDuration = 300;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!openai) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!message) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    return NextResponse.json(
      { message: response.choices[0].message },
      { status: 200 }
    );
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
