"use client";

import React from "react";
import {
  EditorContent,
  FloatingMenu,
  useEditor,
  type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Heading1 } from "lucide-react";

import { Button } from "@aksar/ui/button";
import { Card, CardContent } from "@aksar/ui/card";

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <FloatingMenu editor={editor}>
      <Card>
        <CardContent>
          <Button
            variant="ghost"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 })}
          >
            <Heading1 className="mr-2 h-4 w-4" />
            <span>Heading 1</span>
          </Button>
        </CardContent>
      </Card>
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
      {editor && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorPage;
