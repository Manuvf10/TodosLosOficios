import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        espresso: "#0f0b07",
        cocoa: "#15100b",
        cacao: "#1b140d",
        cream: "#f5eee6",
        muted: "rgba(245,238,230,0.75)",
        sand: "#e9d7c3",
        copper: "#b36a3c",
        clay: "#c97a44",
        amber: "#f0c27b",
        olive: "#8ea66a",
        terracotta: "#a04f39",
      },
      boxShadow: {
        soft: "0 12px 35px rgba(7, 4, 2, 0.45)",
        glow: "0 0 0 1px rgba(240,194,123,0.25), 0 10px 35px rgba(179,106,60,0.25)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        drift: "drift 12s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
