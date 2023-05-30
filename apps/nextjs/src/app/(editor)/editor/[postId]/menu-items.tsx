import type { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
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

export const floatingMenus = (editor: Editor) => [
  {
    action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: editor.isActive("heading", { level: 1 }) ? "bg-secondary" : "",
    icon: <Heading1 className="mr-2 h-4 w-4" />,
    title: "Heading 1",
  },
  {
    action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: editor.isActive("heading", { level: 2 }) ? "bg-secondary" : "",
    icon: <Heading2 className="mr-2 h-4 w-4" />,
    title: "Heading 2",
  },
  {
    action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: editor.isActive("heading", { level: 3 }) ? "bg-secondary" : "",
    icon: <Heading3 className="mr-2 h-4 w-4" />,
    title: "Heading 3",
  },
  {
    action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: editor.isActive("heading", { level: 4 }) ? "bg-secondary" : "",
    icon: <Heading4 className="mr-2 h-4 w-4" />,
    title: "Heading 4",
  },
  {
    action: () => editor.chain().focus().toggleBulletList().run(),
    isActive: editor.isActive("bulletList") ? "bg-secondary" : "",
    icon: <List className="mr-2 h-4 w-4" />,
    title: "Bullet List",
  },
  {
    action: () => editor.chain().focus().toggleOrderedList().run(),
    isActive: editor.isActive("orderedList") ? "bg-secondary" : "",
    icon: <ListOrdered className="mr-2 h-4 w-4" />,
    title: "Ordered List",
  },
  {
    action: () => editor.chain().focus().toggleCodeBlock().run(),
    isActive: editor.isActive("codeBlock") ? "bg-secondary" : "",
    icon: <Code2 className="mr-2 h-4 w-4" />,
    title: "Code Block",
  },
  {
    action: () => editor.chain().focus().toggleBlockquote().run(),
    isActive: editor.isActive("blockquote") ? "bg-secondary" : "",
    icon: <Quote className="mr-2 h-4 w-4" />,
    title: "Blockquote",
  },
  {
    action: () => editor.chain().focus().setHorizontalRule().run(),
    icon: <Minus className="mr-2 h-4 w-4" />,
    title: "Horizontal Rule",
  },
];
