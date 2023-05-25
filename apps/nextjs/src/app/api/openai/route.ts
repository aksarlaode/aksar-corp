import { NextResponse } from "next/server";

import { Configuration, OpenAIApi } from "openai";

import { env } from "~/env.mjs";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { title, role } = await request.json();

    const aiResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          // content: `Create small blog post with html tags based on this title: ${title}`,
          content: `Create 3 line blog post with html tags based on this title: ${title}`,
        },
        {
          role: "system",
          content: `${
            role || "I am a helpful assistant"
          }. Write with html tags.`,
        },
      ],
    });

    // response.revalidate("/api/posts")
    return NextResponse.json(
      {
        content: aiResponse.data.choices[0]?.message?.content,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("request error", error);
    NextResponse.json({ error: "error updating post" }, { status: 500 });
  }
}
