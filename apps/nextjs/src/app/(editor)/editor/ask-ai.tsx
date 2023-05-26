import React, { useState } from "react";

import { type Editor } from "@tiptap/react";
import { SendIcon } from "lucide-react";

import { Button } from "@aksar/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@aksar/ui/dialog";
import { Input } from "@aksar/ui/input";

import { api } from "~/utils/api";

export type ChatType = {
  id: number;
  user: string;
  ai: string;
};

export type ChatItem = {
  author: "User" | "AI";
  content: string;
  isError?: boolean;
};

function AskAI({
  setAIThinking,
  setContent,
  editor,
}: {
  setAIThinking: (thinking: boolean) => void;
  setContent: (content: string) => void;
  editor: Editor;
}) {
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);
  const [prompt, setPrompt] = useState<string>("");

  const generatedTextMutation = api.ai.generateText.useMutation({
    onSuccess: (data) => {
      setChatItems([
        ...chatItems,
        {
          content: data.generatedText,
          author: "AI",
        },
      ]);
      editor.chain().focus().setContent(data.generatedText).run();
      setContent(data.generatedText);
    },

    onError: (error) => {
      setChatItems([
        ...chatItems,
        {
          content: error.message ?? "An error occurred",
          author: "AI",
          isError: true,
        },
      ]);
    },

    onSettled: () => {
      setAIThinking(false);
    },
  });

  const handleUpdate = (prompt: string) => {
    setAIThinking(true);

    setChatItems([
      ...chatItems,
      {
        content: prompt.replace(/\n/g, "\n\n"),
        author: "User",
      },
    ]);

    generatedTextMutation.mutate({ prompt });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Ask AI!
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate AI Content</DialogTitle>
          <DialogDescription>
            What type of writer do you want?{" "}
          </DialogDescription>
        </DialogHeader>
        <Input
          autoComplete="off"
          spellCheck={false}
          className="h-12 w-full"
          placeholder="Ask something..."
          autoFocus
          name="user_prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleUpdate(prompt);
            }
          }}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={() => handleUpdate(prompt)}>
              <SendIcon className="h-5 w-5 text-gray-400" />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AskAI;
