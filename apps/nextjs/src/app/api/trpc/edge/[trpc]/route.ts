import type { NextRequest } from "next/server";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createTRPCContext } from "@aksar/api";
import { edgeRouter } from "@aksar/api/src/edge";

// Stripe is incompatible with Edge runtimes due to using Node.js events
export const runtime = "edge";

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc/edge",
    router: edgeRouter,
    req: req,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
