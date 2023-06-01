import { Suspense } from "react";

import { SiteFooter } from "~/components/footer";
import { MainNav } from "~/components/main-nav";
import { UserNav } from "~/components/user-nav";

import { navItems } from "../config";

export const runtime = "edge";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={navItems} />
          <nav>
            <Suspense>
              <UserNav />
            </Suspense>
          </nav>
        </div>
      </header>
      <main className="flex-1">{props.children}</main>
      <SiteFooter />
    </div>
  );
}
