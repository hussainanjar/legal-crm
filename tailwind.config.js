/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F9FAFB',
        text: {
          primary: '#1A1A1A',
          secondary: '#4B5563',
        },
        accent: {
          indigo: {
            DEFAULT: '#3730A3',
            50: '#ECEAFE',
            100: '#D8D6FC',
            200: '#B1ADF9',
            300: '#8A84F5',
            400: '#635BF2',
            500: '#3730A3',
            600: '#2D2682',
            700: '#221D62',
            800: '#161341',
            900: '#0B0A21',
          },
          green: {
            DEFAULT: '#0F664B',
            50: '#E7F5F0',
            100: '#CFEAE2',
            200: '#9FD5C5',
            300: '#6FC0A8',
            400: '#3FAB8B',
            500: '#0F664B',
            600: '#0C523C',
            700: '#093D2D',
            800: '#06291E',
            900: '#03140F',
          }
        },
        border: '#E5E7EB',
      },
      borderRadius: {
        '2xl': '1rem',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 4px 6px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.03)',
        'modal': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
      },
      spacing: {
        '18': '4.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
    },
  },
  plugins: [
    // Custom form styling
    function({ addBase }) {
      addBase({
        '[type="text"],[type="email"],[type="password"],[type="number"],[type="url"],[type="date"],[type="datetime-local"],[type="time"],[type="search"],[type="tel"],textarea,select': {
          appearance: 'none',
          'background-color': '#fff',
          'border-color': 'rgb(229 231 235)',
          'border-width': '1px',
          'border-radius': '0.375rem',
          'padding-top': '0.5rem',
          'padding-right': '0.75rem',
          'padding-bottom': '0.5rem',
          'padding-left': '0.75rem',
          'font-size': '1rem',
          'line-height': '1.5rem',
          'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
        }
      });
    }
  ],
} 