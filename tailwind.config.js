module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    variants: {
        extend: {},
    },
    plugins: [],
    theme: {
        fontFamily: {
            sans: ["Sailec", "sans-serif"],
        },
        capsize: {
            fontMetrics: {
                sans: {
                    capHeight: 748,
                    ascent: 1063,
                    descent: -306,
                    lineGap: 200,
                    unitsPerEm: 1000,
                },
                serif: {
                    capHeight: 698,
                    ascent: 1025,
                    descent: -275,
                    lineGap: 0,
                    unitsPerEm: 1000,
                },
            },
        },
        colors: {
            green: {
                100: "#f5fbf3",
                200: "#d5efcd",
                300: "#b8e4aa",
                400: "#98d883",
                500: "#78cc5c",
                600: "#57b338",
                700: "#408429",
                800: "#29551b",
                900: "#13270c",
            },
            red: {
                100: "#fdf1f1",
                200: "#f9cdcd",
                300: "#f5adad",
                400: "#f18888",
                500: "#ed6464",
                600: "#e62424",
                700: "#ae1414",
                800: "#6e0d0d",
                900: "#2e0505",
            },
            yellow: {
                100: "#fffbf0",
                200: "#ffecb3",
                300: "#ffdd75",
                400: "#ffcc33",
                500: "#f5b800",
                600: "#c79500",
                700: "#946f00",
                800: "#664d00",
                900: "#332600",
            },
            orange: {
                50: "#ff10710e",
                100: "#fff7f0",
                200: "#ffd7b3",
                300: "#ffb875",
                400: "#ff9633",
                500: "#f57600",
                600: "#c76000",
                700: "#944700",
                800: "#663100",
                900: "#331900",
            },
            purple: {
                100: "#f4f3fb",
                200: "#dbd9f2",
                300: "#c1beea",
                400: "#a49fe0",
                500: "#8b84d7",
                600: "#584ec5",
                700: "#393196",
                800: "#251f60",
                900: "#0f0d26",
            },
            blue: {
                100: "#f1f8fe",
                200: "#c3e2f9",
                300: "#94ccf4",
                400: "#66b6f0",
                500: "#38a0eb",
                600: "#1582d1",
                700: "#0f6099",
                800: "#0a4066",
                900: "#051d2e",
            },
            cyan: {
                100: "#f2fbfd",
                200: "#caeff7",
                300: "#9ee2f0",
                400: "#76d7ea",
                500: "#4ac9e3",
                600: "#20b2d0",
                700: "#18859b",
                800: "#0f5361",
                900: "#07262c",
            },
            gray: {
                100: "#f6f8f9",
                200: "#d4dde2",
                300: "#b3c2cb",
                400: "#8fa4b3",
                500: "#6d899c",
                600: "#576f80",
                700: "#40525e",
                800: "#2b3840",
                900: "#151a1e",
            },
            white: "#ffffff",
            black: "#000000",
        },
    },
}