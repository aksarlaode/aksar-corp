import { Suspense } from "react";
import Link from "next/link";

import { auth } from "@clerk/nextjs";

import { buttonVariants } from "@aksar/ui/button";
import * as Icons from "@aksar/ui/icons";

import { SiteFooter } from "~/components/footer";
import { MainNav } from "~/components/main-nav";

import { navItems } from "../config";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={navItems} />
          <div className="ml-auto flex items-center space-x-4">
            <Suspense>
              <DashboardLink />
            </Suspense>
          </div>
        </div>
      </header>
      <main className="flex-1">{props.children}</main>
      <SiteFooter />
    </div>
  );
}

function DashboardLink() {
  const { userId, orgId } = auth();

  if (!userId) {
    return (
      <Link href="/signin" className={buttonVariants({ variant: "outline" })}>
        Sign In
        <Icons.ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    );
  }

  return (
    <Link
      href={`/${orgId ?? userId}`}
      className={buttonVariants({ variant: "outline" })}
    >
      Dashboard
      <Icons.ChevronRight className="ml-1 h-4 w-4" />
    </Link>
  );
}
