/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./views/*.pug",
      "./assets/js/*.tsx",
      "./assets/js/components/*.tsx",
      "./assets/js/ui/*.tsx",
      './node_modules/flowbite-react/lib/esm/**/*.js',
      "../server/views/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        'sunrise': '#f4ede4',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

