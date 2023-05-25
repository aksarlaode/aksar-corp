"use client";

import React, { useState } from "react";

import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
// load all highlight.js languages
import { lowlight } from "lowlight";

import { Input } from "@aksar/ui/input";

import { BubbleMenuBar, FloatingMenuBar, MenuBar } from "./menu";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

const Content = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("<p>Hello World</p>");

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
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Highlight,
      Placeholder.configure({
        placeholder: "Write something...",
        emptyEditorClass:
          "before:pointer-events-none before:float-left before:h-0 before:text-muted first:before:content-[attr(data-placeholder)]",
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

  return (
    <div className="space-y-6">
      <Input placeholder="Title" onChange={handleOnChangeTitle} value={title} />
      <div>
        {editor && (
          <MenuBar title={title} setContent={setContent} editor={editor} />
        )}
        {editor && <BubbleMenuBar editor={editor} />}
        {editor && <FloatingMenuBar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Content;
