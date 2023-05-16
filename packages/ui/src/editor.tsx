"use client";

import React from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CommandList } from "cmdk";
import { Heading1 } from "lucide-react";

import { Command, CommandItem } from "./command";

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }
  return (
    <Command>
      <CommandList>
        <CommandItem
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 })}
        >
          <Heading1 className="h-4 w-4" />
          <span>Heading 1</span>
        </CommandItem>
      </CommandList>
    </Command>
  );
};

const RichTextEditor = ({
  initialValue,
  onChange,
}: {
  initialValue: string;
  onChange(body: string): void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialValue,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
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
