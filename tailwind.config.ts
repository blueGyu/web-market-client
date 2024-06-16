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
      colors: {
        "item-card": "var(--item-card-bg-color)",
        "item-card-shadow": "var(--item-card-shadow-color)",
        banner: "var(--banner-bg-color)",
        "viewer-button": "var(--viwer-button-bg-color)",
        "category-nav": "var(--category-nav-bg-color)",
        "category-selected": "var(--category-nav-selected)",
      },
    },
  },
  plugins: [],
};
export default config;
