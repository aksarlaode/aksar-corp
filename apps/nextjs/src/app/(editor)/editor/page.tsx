"use client";

import React from "react";
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

const BubbleMenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Card>
        <CardContent className="p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-secondary" : ""}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-secondary" : ""}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-secondary" : ""}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "bg-secondary" : ""}
          >
            <Code className="h-4 w-4" />
          </Button>
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
        <CardContent className="flex flex-col p-4 items-start">
          <Button
            className={
              editor.isActive("heading", { level: 1 }) ? "bg-secondary" : ""
            }
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 className="mr-2 h-4 w-4" />
            <span>Heading 1</span>
          </Button>
          <Button
            className={
              editor.isActive("heading", { level: 2 }) ? "bg-secondary" : ""
            }
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="mr-2 h-4 w-4" />
            <span>Heading 2</span>
          </Button>
          <Button
            className={
              editor.isActive("heading", { level: 3 }) ? "bg-secondary" : ""
            }
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 className="mr-2 h-4 w-4" />
            <span>Heading 3</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
            className={
              editor.isActive("heading", { level: 4 }) ? "bg-secondary" : ""
            }
          >
            <Heading4 className="mr-2 h-4 w-4" />
            <span>Heading 4</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
            className={
              editor.isActive("heading", { level: 5 }) ? "bg-secondary" : ""
            }
          >
            <Heading5 className="mr-2 h-4 w-4" />
            <span>Heading 5</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
            className={
              editor.isActive("heading", { level: 6 }) ? "bg-secondary" : ""
            }
          >
            <Heading6 className="mr-2 h-4 w-4" />
            <span>Heading 6</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-secondary" : ""}
          >
            <List className="mr-2 h-4 w-4" />
            <span>Bullet List</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-secondary" : ""}
          >
            <ListOrdered className="mr-2 h-4 w-4" />
            <span>Ordered List</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "bg-secondary" : ""}
          >
            <Code2 className="mr-2 h-4 w-4" />
            <span>Code Block</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "bg-secondary" : ""}
          >
            <Quote className="mr-2 h-4 w-4" />
            <span> Blockquote</span>
          </Button>
          <Button
            variant="ghost"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus className="mr-2 h-4 w-4" />
            <span> horizontal rule</span>
          </Button>
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
