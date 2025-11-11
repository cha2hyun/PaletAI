/** @type {import('tailwindcss').Config} */
import { heroui } from '@heroui/react';

export default {
  content: ['./src/index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'slate-800': 'rgb(30 41 59)',
        'slate-900': 'rgb(15 23 42)'
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif']
      }
    }
  },
  plugins: [heroui()]
};
