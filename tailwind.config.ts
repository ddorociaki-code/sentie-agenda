import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f6',
          500: '#ec4899',
          700: '#be185d'
        }
      }
    }
  },
  plugins: []
};

export default config;
