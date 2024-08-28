import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      ptb: ["PTBandocheB"],
      ptr: ["PTBandocheR"],
    },
    colors: {
      "stock-slate": "#F8F4ED",
      "stock-red": "#FF9ECD",
      "stock-green": "#D3FFB1",
      "stock-border": "#96A7FF",
      white: "#ffffff",
      "stock-blue": {
        50: "#e8f7ff",
        100: "#d5f0ff",
        200: "#b3e1ff",
        300: "#85caff",
        400: "#56a4ff",
        500: "#2f7eff",
        600: "#0c51ff",
        700: "#0046ff",
        800: "#0640cd",
        900: "#103d9f",
        950: "#0a225c",
      },
      "stock-lemon": {
        50: "#fdffe7",
        100: "#f9ffc1",
        200: "#f8ff86",
        300: "##fbff41",
        400: "#fff80d",
        500: "#ffea00",
        600: "#d1ae00",
        700: "#a67d02",
        800: "#89610a",
        900: "#744f0f",
        950: "#442a04",
      },
      "stock-dark": {
        50: "#f6f6f6",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#888888",
        500: "#6d6d6d",
        600: "#5d5d5d",
        700: "#4f4f4f",
        800: "#424242",
        900: "#3d3d3d",
        950: "#262626",
      },
    },
    extend: {
      boxShadow: {
        "btn-blue-shadow": "-2px -4px 2px 0px rgba(47,0,255,0.17) inset",
        "btn-white-shadow": "-2px -4px 2px 0px rgba(0,0,0,0.18) inset",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "somsatang-gradient": "linear-gradient(to bottom, #F9F0FF, #E8F7FF)",
      },
    },
  },
  plugins: [],
};
export default config;
