import colors from "tailwindcss/colors"

export default {
    content: [
        "./views/**/*.pug",
        "./assets/js/**/*.tsx",
        "../server/views/**/*.tsx",
        "./node_modules/flowbite-react/lib/esm/**/*.js"
    ],
    theme: {
        extend: {
            colors: {
                sunrise: "#f4ede4",
                primary: {
                    500: "#2293e8",
                    600: "#178feb", //Color from logo
                    700: "#1380d4",
                    800: "#0a4e83"
                },
                cyan: {
                    500: "#2293e8",
                    600: "#178feb", //Color from logo
                    700: "#1380d4",
                    800: "#0a4e83"
                }
            }
        }
    },
    plugins: [require("flowbite/plugin")]
}
