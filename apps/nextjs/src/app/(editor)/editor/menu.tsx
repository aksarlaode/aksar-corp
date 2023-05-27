import { useState } from "react";

import { BubbleMenu, FloatingMenu, type Editor } from "@tiptap/react";
import { MoreHorizontalIcon, Redo2, SendIcon, Undo2 } from "lucide-react";

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

export const MenuBar = ({
  editor,
  waiting,
  onUpdate,
}: {
  editor: Editor | null;
  waiting: boolean;
  onUpdate: (prompt: string) => void;
}) => {
  const [prompt, setPrompt] = useState<string>("");

  if (!editor) {
    return null;
  }

  const handleUpdate = () => {
    setPrompt("");
    onUpdate(prompt);
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
            autoComplete="off"
            spellCheck={false}
            className="h-12 w-full"
            placeholder="Ask something..."
            autoFocus
            name="user_prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleUpdate();
              }
            }}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={handleUpdate}>
                <SendIcon className="h-5 w-5 text-gray-400" />
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {waiting && (
        <Button variant="ghost" size="sm" className="ml-auto">
          <MoreHorizontalIcon className="h-4 w-4 animate-pulse" />
        </Button>
      )}
    </div>
  );
};
