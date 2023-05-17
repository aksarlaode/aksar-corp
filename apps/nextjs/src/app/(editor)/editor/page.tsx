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
import { Undo2, Redo2 } from "lucide-react";

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
    <div className="relative">
      <Card className="absolute p-1 top-4 right-4">
        <CardContent>
          <Button
            variant="ghost"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </CardContent>  
      </Card>
      {editor && <BubbleMenuBar editor={editor} />}
      {editor && <FloatingMenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorPage;
