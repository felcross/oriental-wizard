import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sumi: "#14181C",
        "indigo-void": "#1F2A3D",
        washi: "#EDE6D6",
        ember: "#C9A24B",
        lacquer: "#8C2F2F",
        jade: "#4C6B5E",
      },
      fontFamily: {
        display: ["'Shippori Mincho'", "serif"],
        body: ["'Zen Kaku Gothic New'", "sans-serif"],
      },
      keyframes: {
        "seal-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(140,47,47,0.7)" },
          "70%": { boxShadow: "0 0 0 14px rgba(140,47,47,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(140,47,47,0)" },
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
