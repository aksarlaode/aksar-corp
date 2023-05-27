/* eslint-disable @typescript-eslint/no-non-null-assertion */
"use client";

import React, { useState } from "react";



import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";



import { api } from "~/utils/api";



import { BubbleMenuBar, FloatingMenuBar, MenuBar } from "./menu";


export type ChatItem = {
  author: "User" | "AI";
  content: string;
  isError?: boolean;
};

const Content = () => {
  const [content, setContent] = useState<string>("");
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);
const[waiting,setWaiting]=useState(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChangeContent = ({ editor }: any) => {
    if (!(editor as Editor).isEmpty) "";
    setContent((editor as Editor).getHTML());
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      Highlight,
      Placeholder.configure({
        placeholder: "Write something...",
        emptyEditorClass:
          "before:pointer-events-none before:float-left before:h-0 first:before:content-[attr(data-placeholder)]",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm prose-neutral prose-quoteless mx-0 my-5 dark:prose-invert sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
    content: content,
    onUpdate: handleOnChangeContent,
  });

    if (!editor) {
    return null;
  }

  const generatedTextMutation = api.ai.generateText.useMutation({
    onSuccess: (data) => {
      setChatItems([
        ...chatItems,
        {
          content: data.generatedText,
          author: "AI",
        },
      ]);
      editor.chain().focus().setContent(chatItems[0]!.content).run();
      setContent(chatItems[0]!.content);
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
      setWaiting(false);
    },
  });

    const handleUpdate = (prompt: string) => {
      setWaiting(true);

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
    <div>
      {editor && <MenuBar waiting={waiting} onUpdate={handleUpdate} editor={editor} />}
      {editor && <BubbleMenuBar editor={editor} />}
      {editor && <FloatingMenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Content;