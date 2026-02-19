import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  plugins: [typography],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#d6d3d1",      // stone-300
            "--tw-prose-headings": "#e7e5e4",   // stone-200
            "--tw-prose-links": "#a8b496",      // sage-300
            "--tw-prose-bold": "#e7e5e4",       // stone-200
            "h1, h2, h3, h4": {
              fontFamily: "var(--font-serif)",
            },
          },
        },
      },
    },
  },
} satisfies Config;
