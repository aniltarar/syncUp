/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#29E2A2", // Logonuzun ana rengi
          hover: "#24C78F",   // Hover için bir ton koyu
          dark: "#1C9770",    // Daha koyu bir ton
          light: "#A6F4DB",   // Daha açık bir ton
          accent: "#146B4A",  // Vurgu renk
        },
        secondary: {
          DEFAULT: "#E22971", // Tamamlayıcı renk
        },
        neutral: {
          background: "#F5F8F7", // Arka plan için açık ton
          text: "#6C757D",       // Metin için gri ton
        },
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-1px) translateY(-0.5px)' },
          '75%': { transform: 'translateX(1px) translateY(-0.5px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
