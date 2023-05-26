import { getBaseUrl } from "./api";

export type OpenAIBody = {
  prompt: {
    system: string;
    user: string;
  };
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  n?: 1;
};

export const OpenAICreateChat = async (body: OpenAIBody) => {
  const response = await fetch(`${getBaseUrl}/api/openai-generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...body,
    }),
  });

  if (!response.ok) {
    console.error(response.statusText);
    return {
      err: true,
      message: "Can't do this action. Try again!",
    };
  }

  // This data is a ReadableStream
  const data = response.body;
  if (!data) {
    return {
      err: true,
      message: "Something went wrong!",
    };
  }

  return {
    data,
  };
};
