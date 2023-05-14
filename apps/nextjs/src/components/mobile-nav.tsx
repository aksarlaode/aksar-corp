/*"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@aksar/ui/button";
import { Icons } from "@aksar/ui/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@aksar/ui/popover";
import { ScrollArea } from "@aksar/ui/scroll-area";

import { navItems } from "~/app/config";
import { Search } from "./search";
import ThemeToggle from "./theme-toggle";

export function MobileDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.logo className="mr-2 h-6 w-6" />
          <span className="text-lg font-bold tracking-tight">Aksar Corp</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-40 mt-2 h-[calc(100vh-4rem)] w-screen animate-none rounded-none border-none transition-transform">
        <Search />
        <ScrollArea className="py-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              // className="mt-2 flex items-center text-lg font-semibold sm:text-sm"
              className="flex py-1 text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </ScrollArea>
        <div className="border-t pt-4">
          <ThemeToggle side="top" align="start" />
        </div>
      </PopoverContent>
    </Popover>
  );
}*/

import * as React from "react";
import Link from "next/link";

import { cn } from "@aksar/ui";
import { Icons } from "@aksar/ui/icons";

import { siteConfig } from "~/app/config";
import { useLockBody } from "~/hooks/use-lock-body";
import { type NavItem } from "./main-nav";

interface MobileNavProps {
  items: NavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden",
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
