import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  plugins: [typography],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--text-body)",
            "--tw-prose-headings": "var(--text-heading)",
            "--tw-prose-links": "var(--sage-300)",
            "--tw-prose-bold": "var(--text-heading)",
            "h1, h2, h3, h4": {
              fontFamily: "var(--font-serif)",
            },
          },
        },
      },
    },
  },
} satisfies Config;
