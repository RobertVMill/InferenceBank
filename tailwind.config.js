/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Ensure to scan app directory
    './components/**/*.{js,ts,jsx,tsx}',  
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#171717',
        darkBackground: '#0a0a0a',
        darkForeground: '#ededed',
      },
    },
  },
  plugins: [],
  darkMode: 'media', // Enables dark mode based on user's system preferences
}
