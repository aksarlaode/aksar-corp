import type { Config } from "tailwindcss";

import baseConfig from "@aksar/tailwind-config";

export default {
  content: [
    ...baseConfig.content,
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx,mdx}",
  ],
  presets: [baseConfig],
} satisfies Config;
