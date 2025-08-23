import primeui from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
      '../ui/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  plugins: [primeui],
}
