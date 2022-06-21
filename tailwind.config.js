/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    mode: 'all',
    preserveHtmlElements: false,
    content: [
      './src/**/*.html',
      './src/**/*.js',
      './index.html',
    ]
  },
  darkMode: false,
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
