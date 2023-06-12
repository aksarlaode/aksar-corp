import React from "react";
import Link from "next/link";

import type { HTMLContent } from "@tiptap/react";

import { cn } from "@aksar/ui";
import { buttonVariants } from "@aksar/ui/button";
import { Icons } from "@aksar/ui/icons";

import { api } from "~/trpc/server";

import Content from "./content";

export type ChatItem = {
  author: "User" | "AI";
  content: HTMLContent;
  isError?: boolean;
};

type Props = { params: { postId: string } };

const EditorPage = async ({ params }: Props) => {
  const post = await api.post.byId.query({ id: params.postId });

  if (!post) {
    console.log(`Post with id ${params.postId} not found`);
    return null;
  }

  return (
    <div className="container relative h-screen w-screen flex-col pt-20">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4",
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>

      <div className="mx-auto flex w-full flex-col space-y-6">
        <Content post={post} />
      </div>
    </div>
  );
};

export default EditorPage;
