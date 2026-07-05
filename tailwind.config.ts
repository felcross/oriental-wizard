import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "hokusai-deep-blue": "#0F2537",
        "kanagawa-wave": "#1D4461",
        "sea-foam": "#F3F0E7",
        "fuji-sky": "#E5CCA0",
        "hokusai-signature": "#BC3A33",
      },
      fontFamily: {
        display: ["'Ma Shan Zheng'", "cursive"],
        body: ["'Noto Serif JP'", "serif"],
      },
      keyframes: {
        "seal-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(188,58,51,0.7)" },
          "70%": { boxShadow: "0 0 0 14px rgba(188,58,51,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(188,58,51,0)" },
        },
        "drift-in": {
          "0%": { opacity: "0", transform: "translateY(24px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "seal-pulse": "seal-pulse 1.4s ease-out",
        "drift-in": "drift-in 1.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
