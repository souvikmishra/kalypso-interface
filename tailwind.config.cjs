/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			poppins: ['Poppins', 'sans-serif'],
			sans: ['Poppins', ...defaultTheme.fontFamily.sans]
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				dark: {
					...require('daisyui/src/colors/themes')['[data-theme=dark]'],
					'base-100': '#0C101D',
					'base-200': '#151925',
					'base-300': '#202740',
					'--rounded-box': '20px'
				}
			}
		]
	}
};
