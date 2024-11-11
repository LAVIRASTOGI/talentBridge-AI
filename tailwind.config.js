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
        mytheme: {
          primary: "#3b82f6",
          secondary: "#5a6d90",
          success: "#84cc16",
          warning: "#facc15",
          info: "#38bdf8",
          $danger: "#ef4444",
          dark: "#1e293b",
          black: "#161c2d",
          muted: "#94a3b8",
          light: "#f8f9fc",
          white: "#ffffff",
          // Gray
          "gray-100": "#f8f9fa",
          "gray-200": "#f1f5f9",
          "gray-300": "#dee2e6",
          "gray-400": "#ced4da",
          "gray-500": "#adb5bd",
          "gray-600": "#6c757d",
          "gray-700": "#495057",
          backgroundImage: {
            "primary-gradient-overlay":
              "linear-gradient(to top, rgba(224, 231, 255, 1) 0%, rgba(238, 242, 255, 0.5) 100%)",
          },
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
