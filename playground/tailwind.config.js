/** @type {import('tailwindcss').Config} */
import primeui from 'tailwindcss-primeui'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  plugins: [primeui],
}
