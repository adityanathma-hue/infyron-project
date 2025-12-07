module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e6edff',
          300: '#9aa7ff',
          500: '#6366f1',
          700: '#4f46e5',
        },
        accent: {
          400: '#f472b6',
          500: '#fb7185'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}
