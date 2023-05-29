/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: [
    "@aksar/eslint-config/base",
    "@aksar/eslint-config/nextjs",
    "@aksar/eslint-config/react",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
};

module.exports = config;
