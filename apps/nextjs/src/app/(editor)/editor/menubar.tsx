import { type Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  /*List,
ListOrdered,*/
  Highlighter,
  /*Code2,
Heading1,
Heading2,
Heading3,
Heading4,
Heading5,
Heading6,*/
  Italic,
  /*Minus,
Quote,*/
  Strikethrough,
} from "lucide-react";

export const bubbleMenus = (editor: Editor) => [
  {
    action: () => editor.chain().focus().toggleBold().run(),
    disabled: !editor.can().chain().focus().toggleBold().run(),
    isActive: editor.isActive("bold") ? "bg-secondary" : "",
    icon: <Bold className="h-4 w-4" />,
  },
  {
    action: () => editor.chain().focus().toggleItalic().run(),
    disabled: !editor.can().chain().focus().toggleItalic().run(),
    isActive: editor.isActive("italic") ? "bg-secondary" : "",
    icon: <Italic className="h-4 w-4" />,
  },
  {
    action: () => editor.chain().focus().toggleStrike().run(),
    disabled: !editor.can().chain().focus().toggleStrike().run(),
    isActive: editor.isActive("strike") ? "bg-secondary" : "",
    icon: <Strikethrough className="h-4 w-4" />,
  },
  {
    action: () => editor.chain().focus().toggleCode().run(),
    disabled: !editor.can().chain().focus().toggleCode().run(),
    isActive: editor.isActive("code") ? "bg-secondary" : "",
    icon: <Code className="h-4 w-4" />,
  },
  {
    action: () => editor.chain().focus().toggleHighlight().run(),
    disabled: !editor.can().chain().focus().toggleHighlight().run(),
    isActive: editor.isActive("highlight") ? "bg-secondary" : "",
    icon: <Highlighter className="h-4 w-4" />,
  },
];
