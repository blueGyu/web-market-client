import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      maxHeight: {
        page: "var(--page-height)",
      },
      minHeight: {
        page: "var(--page-height)",
      },
      height: {
        header: "var(--header-height)",
        page: "var(--page-height)",
      },
      colors: {
        "item-card": "var(--item-card-bg-color)",
        "item-card-shadow": "var(--item-card-shadow-color)",
        banner: "var(--banner-bg-color)",
        button: "var(--button-bg-color)",
        "category-nav": "var(--category-nav-bg-color)",
        "category-selected": "var(--category-nav-selected)",
        circle: "var(--img-index-none)",
        "circle-none": "var(--img-index-selected)",
      },
    },
  },
  plugins: [],
};
export default config;
