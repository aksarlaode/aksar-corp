import Balancer from "react-wrap-balancer";

import { cn } from "@aksar/ui";
import { buttonVariants } from "@aksar/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@aksar/ui/card";
import { Icons } from "@aksar/ui/icons";

import { marketingFeatures, siteConfig } from "~/app/config";

export const runtime = "edge";

export default function Home() {
  return (
    <main className="container flex min-h-screen w-full flex-col items-center justify-center pt-48">
      <div className="z-10 min-h-[50vh] w-full max-w-4xl px-5 xl:px-0">
        <h1
          className="font-display animate-fade-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          <Balancer>Your all-in-one, enterprise ready starting point</Balancer>
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          <Balancer>
            Aksar Corp is a Next.js starter kit that includes everything you
            need to build a modern web application. Mobile application
            preconfigured, ready to go.
          </Balancer>
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.40s", animationFillMode: "forwards" }}
        >
          <a
            className={cn(buttonVariants({ variant: "default" }))}
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.gitHub className="mr-1 h-4 w-4" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
      <div className="my-16 w-full max-w-screen-lg animate-fade-up gap-5 border-t p-5 xl:px-0">
        <h2 className="py-8 text-center text-3xl font-bold md:text-4xl">
          What&apos;s included?
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {marketingFeatures.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>{feature.icon}</CardHeader>
              <CardContent>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="mt-2">
                  {feature.body}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
