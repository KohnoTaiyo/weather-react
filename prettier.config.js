/** @type {import('prettier').Config} */
export const importOrder = [
  "^(react/(.*)$)|^(react$)",
  "^(next/(.*)$)|^(next$)",
  "",
  "<THIRD_PARTY_MODULES>",
  "",
  "^types$",
  "^@/components/(.*)$",
  "^@/app/(.*)$",
  "",
  "^[./]",
];
export const importOrderParserPlugins = ["typescript", "jsx", "decorators-legacy"];
export const importOrderTypeScriptVersion = "5.0.4";
export const plugins = ["@ianvs/prettier-plugin-sort-imports"];
export const printWidth = 120;
