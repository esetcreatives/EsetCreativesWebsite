/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./admin.html",
    "./case-study.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#b8e11e',
        'accent-active': '#6ab00c',
        'brand-mid': '#6ab00c',
        'brand-dark': '#0d362e',
        'brand-info': '#97cb4a',
        'brand-success': '#28a745',
        'brand-warning': '#ffc107',
        'brand-danger': '#dc3545',
        'bg-light': '#f0f7e9',
      },
      fontFamily: {
        sans: ['General Sans', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'glass-light': 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,247,233,0.85) 100%)',
      },
    },
  },
  plugins: [],
}
