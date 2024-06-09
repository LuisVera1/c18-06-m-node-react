import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "../pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            /*Fuentes agregadas*/
            fontFamily: {
                sans: ["Open Sans", "sans-serif"],
                barlow: ["Barlow", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            /*Se agregaron los colores definidos por los UX/UI*/
            colors: {
                primary: "#2190AA",
                secundary: "#5EBDD7",
                action: "#C6F1FE",
                grey: "#F6F6F6",
                dark: "#535353",
            },
        },
    },
    plugins: [],
};
export default config;
