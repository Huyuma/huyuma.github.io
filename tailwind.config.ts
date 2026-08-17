// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./pages/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        sea: {
          50: "#f3fbfd",
          100: "#e6f7fb",
          200: "#bfeaf6",
          300: "#99ddf0",
          400: "#4fc6e6",
          500: "#0ea5e9",
          600: "#0b87c7",
          700: "#076292",
          800: "#05455f",
          900: "#03262f"
        }
      },
      borderRadius: {
        xl: "1rem"
      }
    }
  },
  plugins: []
};

export default config;
