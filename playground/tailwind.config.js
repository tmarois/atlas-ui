import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import primeui from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
      '../ui/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  plugins: [
      containerQueries,
      forms,
      typography,
      primeui,
  ],
}
