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
        'primary-bg': '#faf7f5', // Pastel background
        'primary-text': '#333',  // Dark grey text
        'accent-orange': '#ff6b35', // Orange accent
        'dark-grey': '#2d2d2d',  // Dark blackish-grey
        'light-accent': '#ffeedb',  // Light pastel orange
      },
    },
  },
  plugins: [],
};
export default config;
