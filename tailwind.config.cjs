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
				light: {
					...require('daisyui/src/theming/themes')['[data-theme=light]'],
					primary: '#424CEA',
					'primary-content': '#FFFFFF',
					'base-content': '#070A21',
					'base-200': '#F3F7FA',
					'base-300': '#98A2B0',
					success: '#4CC18B',
					error: '#FF2B61'
				}
			}
		]
	}
};
