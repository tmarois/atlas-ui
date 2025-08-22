/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
import primeui from 'tailwindcss-primeui'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../ui/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [primeui, typography],
}
