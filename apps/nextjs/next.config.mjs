import "./src/env.mjs";
import "@aksar/api/src/env.mjs";

import withMDX from "@next/mdx";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ["@aksar/api", "@aksar/db"],
  pageExtensions: ["ts", "tsx", "mdx"],
  experimental: {
    mdxRs: true,
    serverActions: true,
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withMDX()(config);
