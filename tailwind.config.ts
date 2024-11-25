import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oceanBlue: '#1B4965',
        seaFoam: '#BEE3DB',
        sunsetGold: '#F9BC60',
        coral: '#FF6B6B',
        slate: '#555B6E',
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        secondary: ['Karla', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
