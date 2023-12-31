/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primary: {
					dark: '#061012',
					light: '#ECEFF2'
				},
				secondary: {
					dark: '#252225',
					light: '#DADCE7'
				},
				highlight: {
					dark: '#84A4FC',
					light: '#274690'
				}
			},
			fontFamily: {
				Roboto: ['Roboto', 'Arial'],
				RobotoCondensed: ['RobotoCondensed', 'Arial']
			}
		},
	},
	plugins: [
			require('@tailwindcss/typography'),
		],
}
