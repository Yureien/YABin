const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                background: 'var(--color-background)',
                dark: 'var(--color-dark)',
            },
            fontFamily: {
                sans: ['Fira Mono', ...defaultTheme.fontFamily.mono],
            },
        },
    },
    plugins: [],
};
