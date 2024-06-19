import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        header: "var(--header-height)",
        page: "var(--page-min-height)",
      },
      colors: {
        "item-card": "var(--item-card-bg-color)",
        "item-card-shadow": "var(--item-card-shadow-color)",
        banner: "var(--banner-bg-color)",
        "viewer-button": "var(--viwer-button-bg-color)",
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
