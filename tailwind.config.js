module.exports = {
    purge: {
        enabled: process.env.NODE_ENV === "production",
        mode: "all",
        content: ["./**/**/*.html", "./**/**/*.svelte"],

        options: {
            whitelistPatterns: [/svelte-/],
        },
    },

    theme: {
        extend: {},
    },
    variants: {},
    plugins: [],
};
