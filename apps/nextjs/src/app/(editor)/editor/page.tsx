import React from "react";
import Link from "next/link";

import { cn } from "@aksar/ui";
import { buttonVariants } from "@aksar/ui/button";
import { Icons } from "@aksar/ui/icons";

import Content from "./content";

export const revalidate = 60;

const Post = () => {
  return (
    <div className="container relative h-screen w-screen flex-col pt-8">
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

      <div className="mx-auto flex w-full flex-col space-y-6 sm:w-[350px]">
        <Content />
      </div>
    </div>
  );
};

export default Post;
