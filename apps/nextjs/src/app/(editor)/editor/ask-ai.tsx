/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, useState, type FormEvent } from "react";

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
import { toast } from "@aksar/ui/use-toast";

import { OpenAICreateChat, type OpenAIBody } from "~/utils/editor";

export type ChatType = {
  id: number;
  user: string;
  ai: string;
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
  const [previousAnswers, setPreviousAnswers] = useState("");
  const [requestingToAPI, setRequestingToAPI] = useState(false);
  const chatWrapper = useRef(null);
  const [chats, setChats] = useState<ChatType[]>([
    {
      id: 1,
      user: "Hello, how can I help you today?",
      ai: "",
    },
  ]);

  const handleChat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form) return;
    const formData = new FormData(form);
    const { user_prompt } = Object.fromEntries(formData.entries());
    if (!requestingToAPI && user_prompt) {
      setRequestingToAPI(true);
      chats.pop();
      const prompt_input = form.querySelector("input");
      setAIThinking(true);
      if (prompt_input) {
        prompt_input.value = "";
      }
      // Use functional updates to set the state of chats array and currentId
      setChats((prevChats) => [
        ...prevChats,
        {
          id: prevChats.length + 1,
          user: user_prompt.toString(),
          ai: "",
        },
      ]);

      // Create the request body for OpenAI's API
      const body = {
        prompt: {
          system: `Please provide a response to the following prompt using a programming language of your choice. Your answer should be of a high level and adhere to industry standards for code quality and documentation. Please reference previous answers for guidance: ${previousAnswers}`,
          user: user_prompt.toString(),
        },
        max_tokens: 1000,
      } as OpenAIBody;

      try {
        // Call the OpenAI API with the request body
        const res = await OpenAICreateChat(body);
        setAIThinking(false);

        // Handle any errors returned by the API
        if (res?.err) {
          toast({
            variant: "destructive",
            defaultValue: res?.message,
          });
          return;
        }

        // Parse the response data
        const data = res.data;
        const reader = data?.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let aiResponse = "";

        // Read the response data stream and update the chats state as chunks arrive
        while (!done) {
          const { value, done: doneReading } = (await reader?.read()) as any;
          done = doneReading;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const chunkValue = decoder.decode(value);
          aiResponse += chunkValue;
          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.id === chats.length + 1 ? { ...chat, ai: aiResponse } : chat,
            ),
          );
          const chat = chatWrapper.current as any;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          chat.scrollTop = chat.scrollHeight;
        }
        setRequestingToAPI(false);
        setPreviousAnswers(`${previousAnswers},${aiResponse}`);
        editor
          .chain()
          .focus()
          .setContent(`${previousAnswers},${aiResponse}`)
          .run();
        setContent(`${previousAnswers},${aiResponse}`);
      } catch (error) {
        // Handle any other errors that may occur
        console.error(error);
        setRequestingToAPI(false);
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Ask AI!
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" asChild>
        <form onSubmit={handleChat}>
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
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">
                <SendIcon className="h-5 w-5 text-gray-400" />
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AskAI;
