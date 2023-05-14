import { Suspense } from "react";
import Link from "next/link";

import { cn } from "@aksar/ui";
import { buttonVariants } from "@aksar/ui/button";

import { SiteFooter } from "~/components/footer";
import { MainNav } from "~/components/main-nav";
import { UserNav } from "~/components/user-nav";
import { navItems } from "../config";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex-1">
        {props.children}
        {props.modal}
      </div>
      <SiteFooter />
    </div>
  );*/
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={navItems} />
          <nav>
            <Suspense>
              {/* @ts-expect-error - ... */}
              <UserNav />
            </Suspense>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
