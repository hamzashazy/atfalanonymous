module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // For React projects
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        darkBlue: '#021D35',
        navyDark: '#0A365A',
        navyLight: '#0D426F',
        lightBlue: '#008CFF',
      },
    },
  },
  plugins: [],
};
