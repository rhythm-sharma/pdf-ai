import openai from "@/utils/openai";
import { NextResponse } from "next/server";

export const maxDuration = 60;

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

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: message,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    console.log("response", response);

    return NextResponse.json(
      {
        message: `data:image/jpeg;base64,${response.data[0].b64_json}`,
      },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
