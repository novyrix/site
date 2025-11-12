import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Novyrix Brand Colors
        primary: {
          DEFAULT: "#FF6B35", // Orange
          50: "#FFE8E0",
          100: "#FFD4C2",
          200: "#FFA885",
          300: "#FF8B5C",
          400: "#FF6B35",
          500: "#FF5722",
          600: "#E64A19",
          700: "#D84315",
          800: "#BF360C",
          900: "#A62A00",
        },
        dark: {
          DEFAULT: "#000000",
          50: "#1A1A1A",
          100: "#141414",
          200: "#0F0F0F",
          300: "#0A0A0A",
          400: "#050505",
          500: "#000000",
        },
        glass: {
          light: "rgba(255, 255, 255, 0.05)",
          medium: "rgba(255, 255, 255, 0.1)",
          heavy: "rgba(255, 255, 255, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(255, 107, 53, 0.1)",
        "glass-lg": "0 16px 64px 0 rgba(255, 107, 53, 0.15)",
        glow: "0 0 20px rgba(255, 107, 53, 0.3)",
        "glow-lg": "0 0 40px rgba(255, 107, 53, 0.4)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(255, 107, 53, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(255, 107, 53, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
