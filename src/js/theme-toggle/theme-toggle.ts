'use strict';

interface ConstructorProps {
	light: HTMLElement | null;
	dark: HTMLElement | null;
	toggle: HTMLElement | null;
}

export default class ThemeToggle {
	private light;
	private dark;
	private toggle;

	constructor({ light, dark, toggle }: ConstructorProps) {
		if (!light || !dark || !toggle) {
			throw new Error('One or more elements are not defined');
		}

		this.light = light;
		this.dark = dark;
		this.toggle = toggle;

		this._checkDefaultTheme();
		this._checkTheme();
		this._setTheme();
	}

	_checkDefaultTheme() {
		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches &&
			localStorage.getItem('theme') !== 'light'
		) {
			localStorage.setItem('theme', 'dark');
			return;
		}
	}

	_checkTheme() {
		if (localStorage.getItem('theme') === 'dark') {
			document.documentElement.classList.add('dark');
			this.dark.classList.add('hidden');
			this.light.classList.remove('hidden');
			return;
		}

		if (localStorage.getItem('theme') !== 'dark') {
			document.documentElement.classList.remove('dark');
			this.light.classList.add('hidden');
			this.dark.classList.remove('hidden');
			return;
		}
	}

	_setTheme() {
		this.toggle.addEventListener('click', () => {
			if (localStorage.getItem('theme') !== 'dark') {
				localStorage.setItem('theme', 'dark');
				this._checkTheme();
				return;
			}

			localStorage.setItem('theme', 'light');
			this._checkTheme();
		});
	}
}
