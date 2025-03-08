import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.jsの推奨設定を持ってくる
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ここでファイル単位のルールを上書き
  {
    files: [
      "tailwind.config.js",
      "tailwind.config.cjs",
      "postcss.config.js",
      // 他にも設定ファイルがあれば追加
    ],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
