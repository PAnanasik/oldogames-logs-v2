import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#232326",
        background: "#1C1C1F",
        link: "#5479FA",
        secondary: "#AEAEAE",
      },
    },
  },
  plugins: [],
};
export default config;
