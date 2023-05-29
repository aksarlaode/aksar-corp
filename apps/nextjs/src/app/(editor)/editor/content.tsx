"use client";

import React, { useState } from "react";

import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Input } from "@aksar/ui/input";

import { BubbleMenuBar, FloatingMenuBar } from "./menu";
import { MenuBar } from "./menu-bar";

//import { api } from "~/utils/api";

export type ChatItem = {
  author: "User" | "AI";
  content: string;
  isError?: boolean;
};

const Content = () => {
  const [content, setContent] = useState<string>("");

  //const post=api.post.byId.useQuery()
  const [title, setTitle] = useState<string>("");

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChangeContent = ({ editor }: any) => {
    if (!(editor as Editor).isEmpty) "";
    setContent((editor as Editor).getHTML());
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
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

  return (
    <div className="space-y-6">
      <Input placeholder="Title" onChange={handleOnChangeTitle} value={title} />
      <div>
        {editor && (
          <MenuBar setContent={setContent} title={title} editor={editor} />
        )}
        {editor && <BubbleMenuBar editor={editor} />}
        {editor && <FloatingMenuBar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Content;
