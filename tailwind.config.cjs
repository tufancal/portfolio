/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primaryDark: '#061012',
				secondaryDark: '#ECEFF2',
				tertiaryDark: '#252225',
				highlightDark: '#84A4FC',
				primaryLight: '#ECEFF2',
				secondaryLight: '#061012',
				tertiaryLight: '#DADCE7',
				highlightLight: '#2E4756'
			}
		},
	},
	plugins: [],
}
