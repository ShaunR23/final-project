

module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./src/components/App.js",
    "./src/components/Login.js",
    "./src/components/Header.js",
    "./src/components/QuestionForm.js",
    "./src/components/Game.js",
    "./src/components/Leaderboard.js",
    "./src/components/ProfileView.js",
    "./src/components/Home.js",
  ],
  theme: {
    colors: {
      'reg-blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'reg-green' : '#22c55e',
      'light-green': '#99f6e4',
      'gray-light': '#d3dce6',
      'dark-green': 'rgb(22 101 52)',
      'light-blue': '#22d3ee',
      'light-red' : '#e11d48',
      
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },

    extend: {},
  },
  presets: [require('full-palette')],
  plugins: [
    require('flowbite/plugin')
  ],
}
