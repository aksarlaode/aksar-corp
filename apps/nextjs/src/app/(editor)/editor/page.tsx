import React from "react";
import Link from "next/link";

import { cn } from "@aksar/ui";
import { buttonVariants } from "@aksar/ui/button";
import { Icons } from "@aksar/ui/icons";

import Content from "./content";

export const revalidate = 60;

const Post = () => {
  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute left-4 top-4 md:hidden",
          )}
        >
          <>
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            Back
          </>
        </Link>
      </div>
      <div className="flex h-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Content />
        </div>
      </div>
    </>
  );
};

export default Post;
