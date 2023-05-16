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

const RichTextEditor = ({
  content,
}: //onChange,
{
  content: string;
  //onChange(body: string): void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
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

export default RichTextEditor;
