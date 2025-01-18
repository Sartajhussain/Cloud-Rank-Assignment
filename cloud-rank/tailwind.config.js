module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include all files in the `src` folder
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "#1E40AF",
        customGreen: "#10B981",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
