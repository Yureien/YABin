const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#E5E1D1',
				background: '#101419',
				dark: 'rgba(0, 0, 0, 0.4)',
			},
			fontFamily: {
				sans: ['Fira Mono', ...defaultTheme.fontFamily.mono]
			}
		}
	},
	plugins: []
};
