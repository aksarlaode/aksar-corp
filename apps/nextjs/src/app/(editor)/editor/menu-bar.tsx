import { useState } from "react";

import type { Editor } from "@tiptap/react";
import { MoreHorizontalIcon, Redo2, SendIcon, Undo2 } from "lucide-react";

import { Button } from "@aksar/ui/button";
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
import { toast } from "@aksar/ui/use-toast";

import { getBaseUrl } from "~/utils/api";

type Props = {
  editor: Editor | null;
  setContent: (content: string) => void;
  title: string;
};

export const MenuBar = ({ editor, setContent, title }: Props) => {
  const [role, setRole] = useState<string>("I am a helpful assistant.");
  const [waiting, setWaiting] = useState(false);

  if (!editor) {
    return null;
  }

  const postAiContent = async () => {
    try {
      setWaiting(true);
      editor
        .chain()
        .focus()
        .setContent("Generating Ai Content. Please Wait...")
        .run();

      const response = await fetch(`${getBaseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          role: role,
        }),
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data: { content: string } = await response.json();
      console.log(data);

      editor.chain().focus().setContent(data.content).run();
      setContent(data.content);
      setWaiting(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error",
      });
    }
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
            value={role}
            onChange={(e) => setRole(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                void postAiContent();
              }
            }}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" onClick={postAiContent}>
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
