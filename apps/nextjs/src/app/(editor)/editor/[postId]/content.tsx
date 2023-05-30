"use client";

import React, { useState } from "react";

import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Button } from "@aksar/ui/button";
import { Input } from "@aksar/ui/input";

import { api } from "~/trpc/client";

import { BubbleMenuBar, FloatingMenuBar } from "./menu";
import { MenuBar } from "./menu-bar";

export type ChatItem = {
  author: "User" | "AI";
  content: string;
  isError?: boolean;
};

const Content = ({ params }: { params: { postId: string } }) => {
  const [content, setContent] = useState<string>("");

  const post = api.post.byId.useQuery({ id: params.postId });
  const [title, setTitle] = useState<string | undefined>(post.data?.title);

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

  const handleSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    editor.commands.setContent(post.data!.content);
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
