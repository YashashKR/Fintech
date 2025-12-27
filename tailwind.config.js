/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enforced Solid Blue Palette
        primary: {
          DEFAULT: '#2563EB', // Blue-600
          hover: '#1D4ED8',   // Blue-700
          light: '#60A5FA',   // Blue-400
        },
        secondary: {
          DEFAULT: '#BFDBFE', // Blue-200
          text: '#1E40AF',    // Blue-800
        },
        background: '#F8FAFC', // Slate-50
        surface: '#FFFFFF',
        text: {
          main: '#1E293B',   // Slate-800
          muted: '#64748B',  // Slate-500
        },
        success: '#10B981', // Emerald-500 (Solid)
        warning: '#F59E0B', // Amber-500 (Solid)
        error: '#EF4444',   // Red-500 (Solid)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'clean': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // Subtle shadow
      }
    },
  },
  plugins: [],
}
