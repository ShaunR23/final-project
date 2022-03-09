

module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./src/components/App.js",
    "./src/components/Login.js",
    "./src/components/Header.js",
    "./src/components/QuestionForm.js",
  ],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'dark-green': 'rgb(22 101 52)'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },

    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
