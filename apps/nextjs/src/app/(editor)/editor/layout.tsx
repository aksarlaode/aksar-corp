import React, { Suspense } from "react";
import Link from "next/link";

import { cn } from "@aksar/ui";
import { buttonVariants } from "@aksar/ui/button";
import { Icons } from "@aksar/ui/icons";

import { SiteFooter } from "~/components/footer";
//import { MainNav } from "~/components/main-nav";
import { UserNav } from "~/components/user-nav";

//import { navItems } from "../../config";

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          {/* <MainNav items={navItems} /> */}
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              /*"absolute left-4 top-4 md:hidden",*/
            )}
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              Back
            </>
          </Link>

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
