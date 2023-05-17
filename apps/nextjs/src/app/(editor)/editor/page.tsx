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
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Strikethrough,
} from "lucide-react";

import { Menubar, MenubarMenu, MenubarTrigger } from "@aksar/ui/menubar";

const BubbleMenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="h-4 w-4" />
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </BubbleMenu>
  );
};

const FloatingMenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Menubar className="flex flex-col">
        <MenubarMenu>
          <MenubarTrigger
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 className="mr-2 h-4 w-4" />
            <span>Heading 1</span>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="mr-2 h-4 w-4" />
            <span>Heading 2</span>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 className="mr-2 h-4 w-4" />
            <span>Heading 3</span>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </FloatingMenu>
  );
};

const EditorPage = () => {
  const editor = useEditor({
    extensions: [StarterKit],
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
