import dynamic from "next/dynamic";
import Link from "next/link";

import { cn } from "@aksar/ui";
import { Icons } from "@aksar/ui/icons";

import { siteConfig } from "~/app/config";

const ThemeToggle = dynamic(() => import("~/components/theme-toggle"), {
  ssr: false,
});

export function SiteFooter(props: { className?: string }) {
  return (
    <footer className={cn("container border-t py-6", props.className)}>
      <div className="flex flex-col items-center justify-between gap-4">
        <div className="flex w-full justify-between">
          <Link href="/" className="flex items-center text-lg font-medium">
            <Icons.logo className="mr-2 h-6 w-6" />
            Aksar Corp
          </Link>
          <ThemeToggle />
        </div>
        <div>
          <p className="text-center text-sm/7 text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href={siteConfig.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Aksar
            </a>
            . Inspired by{" "}
            <a
              href="https://tx.shadcn.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Taxonomy
            </a>
            . Components by{" "}
            <a
              href="https://twitter.com/shadcn"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Shadcn
            </a>
            . The source code is available on{" "}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>{" "}
      </div>
    </footer>
  );
}
