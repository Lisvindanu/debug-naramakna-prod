/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',      // Mobile kecil
        'sm': '640px',      // Mobile besar/phablet  
        'md': '768px',      // Tablet portrait
        'lg': '1024px',     // Tablet landscape / laptop kecil (14")
        'xl': '1280px',     // Desktop kecil (17")
        '2xl': '1536px',    // Desktop sedang (24")
        '3xl': '1920px',    // Desktop besar (27"+)
        '4xl': '2560px',    // Ultra wide monitors
      },
      maxWidth: {
        '8xl': '88rem',     // 1408px
        '9xl': '96rem',     // 1536px  
        '10xl': '120rem',   // 1920px
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      }
    },
  },
  plugins: [],
}

