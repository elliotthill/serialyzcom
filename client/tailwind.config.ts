import colors from 'tailwindcss/colors';

export default {
  content: [
      "./views/**/*.pug",
      "./assets/js/**/*.tsx",
      "../server/views/**/*.tsx",
      './node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'sunrise': '#f4ede4',
        primary: colors.blue
      },
    },



  },
  plugins: [
    require('flowbite/plugin')
  ]
}
