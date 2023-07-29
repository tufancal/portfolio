/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					dark: '#061012',
					light: '#ECEFF2'
				},
				secondary: {
					dark: '#ECEFF2',
					light: '#061012'
				},
				tertiary: {
					dark: '#252225',
					light: '#DADCE7'
				},
				highlight: {
					dark: '#84A4FC',
					light: '#2E4756'
				}
			},
			fontFamily: {
				Roboto: ['Roboto', 'Times New Roman'],
				RobotoCondensed: ['RobotoCondensed', 'Times New Roman']
			}
		},
	},
	plugins: [],
}
