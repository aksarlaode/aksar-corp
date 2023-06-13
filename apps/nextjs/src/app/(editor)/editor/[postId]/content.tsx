/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

import type { Editor, HTMLContent } from "@tiptap/react";

import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Button } from "@aksar/ui/button";
import { Input } from "@aksar/ui/input";

import { BubbleMenuBar, FloatingMenuBar } from "./menu";
import { MenuBar } from "./menu-bar";

export type ChatItem = {
  author: "User" | "AI";
  content: HTMLContent;
  isError?: boolean;
};

const Content = ({ post }: any) => {
  const [content, setContent] = useState<string | null>(post.content);
  const [title, setTitle] = useState<string>(post.title);

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

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

  const handleSubmit = () => {
    editor.commands.setContent(content);
  };

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
        <Button type="submit" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default Content;
