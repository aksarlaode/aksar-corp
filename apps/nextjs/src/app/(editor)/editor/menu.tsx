import { useState } from "react";

import { BubbleMenu, FloatingMenu, type Editor } from "@tiptap/react";
import { Redo2, Undo2 } from "lucide-react";

import { Button } from "@aksar/ui/button";
import { Card, CardContent } from "@aksar/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@aksar/ui/dialog";
import { Input } from "@aksar/ui/input";
import { Separator } from "@aksar/ui/separator";

import { getBaseUrl } from "~/utils/api";

import { bubbleMenus, floatingMenus } from "./menubar";

export const BubbleMenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Card>
        <CardContent className="p-1">
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

export const FloatingMenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <Card>
        <CardContent className="flex flex-col items-start p-1">
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

type Props = {
  editor: Editor | null;
  setContent: (content: string) => void;
  title: string;
};

export const MenuBar = ({ editor, title, setContent }: Props) => {
  const [role, setRole] = useState<string>("I am a helpful assistant.");

  if (!editor) {
    return null;
  }

  const postAiContent = async () => {
    editor
      .chain()
      .focus()
      .setContent("Generating Ai Content. Please Wait...")
      .run();

    const response = await fetch(`${getBaseUrl()}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        role,
      }),
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: { content: string } = await response.json();

    editor.chain().focus().setContent(data.content).run();
    setContent(data.content);
  };

  return (
    <div className="flex">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo2 className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Ask AI!
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Generate AI Content</DialogTitle>
            <DialogDescription>
              What type of writer do you want?{" "}
            </DialogDescription>
          </DialogHeader>
          <Input
            id="name"
            placeholder="Role"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={postAiContent}>
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
