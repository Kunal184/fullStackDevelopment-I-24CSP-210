/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        app: {
          bg: '#F9F9F9',
          fg: '#111111',
        },
        muted: '#666666',
        accent: '#222222',
        border: 'rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
