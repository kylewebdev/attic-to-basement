import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  plugins: [typography],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#44403c",
            "--tw-prose-headings": "#292524",
            "--tw-prose-links": "#4a6338",
            "--tw-prose-bold": "#292524",
            "h1, h2, h3, h4": {
              fontFamily: "var(--font-serif)",
            },
          },
        },
      },
    },
  },
} satisfies Config;
