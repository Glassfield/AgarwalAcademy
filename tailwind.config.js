/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          light: '#3B82F6',
          dark: '#1E40AF'
        },
        secondary: {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669'
        },
        accent: {
          DEFAULT: '#F97316',
          light: '#FB923C',
          dark: '#EA580C'
        },
        background: {
          DEFAULT: '#F9FAFB',
          light: '#FFFFFF',
          dark: '#F3F4F6'
        },
        text: {
          DEFAULT: '#1F2937',
          light: '#6B7280',
          dark: '#111827'
        }
      },
      fontFamily: {
        primary: ['"Poppins"', 'sans-serif'],
        secondary: ['"Inter"', 'sans-serif']
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)'
      }
    },
  },
  plugins: [],
}
