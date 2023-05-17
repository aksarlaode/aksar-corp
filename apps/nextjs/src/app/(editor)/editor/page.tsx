"use client";

import React from "react";
import Highlight from "@tiptap/extension-highlight";
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
  type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Strikethrough,
} from "lucide-react";

import { Button } from "@aksar/ui/button";
import { Card, CardContent } from "@aksar/ui/card";

import { bubbleMenus, floatingMenus } from "./menubar";

const BubbleMenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Card>
        <CardContent className="p-2">
          {bubbleMenus(editor).map((item, idx) => (
            <Button
              key={idx}
              variant="ghost"
              size="sm"
              onClick={item.action}
              disabled={item.disabled}
              className={item.isActive}
            >
              {item.icon}
            </Button>
          ))}
        </CardContent>
      </Card>
    </BubbleMenu>
  );
};

const FloatingMenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Card>
        <CardContent className="flex flex-col items-start p-4">
          {floatingMenus(editor).map((item, idx) => (
            <Button
              key={idx}
              variant="ghost"
              onClick={item.action}
              className={item.isActive}
            >
              {item.icon}
              {item.title}
            </Button>
          ))}
        </CardContent>
      </Card>
    </FloatingMenu>
  );
};

const EditorPage = () => {
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
    ],
    content: `<p>Hello World</p>`,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      /*onChange(html);*/
      console.log("html:", html);
    },
  });

  return (
    <div>
      {editor && <BubbleMenuBar editor={editor} />}
      {editor && <FloatingMenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorPage;
