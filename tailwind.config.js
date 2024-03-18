/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			sans: ['Arial', 'serif'],
			serif: ['Pangaia', 'sans-serif']
		},
		colors: {
			text: '#C9C5C6',
			background: '#363348',
			accent: '#D4922E',
			primary: '#78CBDE',
			secondary: '#C5C9AA'
		}
	},
	plugins: []
};
