import { useState } from "react";

import { BubbleMenu, FloatingMenu, type Editor } from "@tiptap/react";
import { MoreHorizontalIcon, Redo2, Undo2 } from "lucide-react";

import { Button } from "@aksar/ui/button";
import { Card, CardContent } from "@aksar/ui/card";

import AskAI from "./ask-ai";
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
  setContent,
}: {
  editor: Editor | null;
  setContent: (content: string) => void;
}) => {
  const [AIThinking, setAIThinking] = useState(false);

  if (!editor) {
    return null;
  }

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
      <AskAI
        setContent={setContent}
        editor={editor}
        setAIThinking={setAIThinking}
      />
      {AIThinking && (
        <Button variant="ghost" size="sm" className="ml-auto">
          <MoreHorizontalIcon className="h-4 w-4 animate-pulse" />
        </Button>
      )}
    </div>
  );
};
