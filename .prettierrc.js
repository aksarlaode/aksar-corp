/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig*/
/** @typedef  {import("prettier").Config} PrettierConfig*/
/** @typedef  {{ tailwindConfig: string }} TailwindConfig*/

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindConfig: "./packages/config/tailwind",
  importOrderTypeScriptVersion: "4.0.0",
  importOrder: [
    "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
    "^(next/(.*)$)|^(next$)",
    "^(expo(.*)$)|^(expo$)",
    "",
    "<TYPES>",
    "<TYPES>^[.]",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@aksar/(.*)$",
    "",
    "^~/(.*)$",
    "",
    "^[.]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
};

module.exports = config;
