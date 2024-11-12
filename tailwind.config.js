/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#3b82f6",
          "primary-content": "#ffffff",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          // primary: "#3b82f6",
          // "primary-content": "#ffffff",
        },
        corporate: {
          ...require("daisyui/src/theming/themes")["corporate"],
          // primary: "#3b82f6",
          // "primary-content": "#ffffff",
        },
        synthwave: {
          ...require("daisyui/src/theming/themes")["synthwave"],
        },
        business: {
          ...require("daisyui/src/theming/themes")["business"],
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
