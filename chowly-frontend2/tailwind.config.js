/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFF4EC",
          100: "#FFE6D3",
          200: "#FFC9A3",
          300: "#FFA669",
          400: "#FB8332",
          500: "#F5720E",
          600: "#E05F03",
          700: "#B94B02",
          800: "#933C06",
          900: "#78320A",
        },
        ink: {
          50: "#F7F8FA",
          100: "#EEF0F3",
          200: "#DFE3E8",
          300: "#C3C9D1",
          400: "#8F96A3",
          500: "#5F6673",
          600: "#454C58",
          700: "#333A45",
          800: "#22262F",
          900: "#15171C",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(21,23,28,0.04), 0 1px 6px -1px rgba(21,23,28,0.06)",
        pop: "0 8px 24px -4px rgba(21,23,28,0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
