'use strict';

import ThemeToggle from "./theme-toggle/theme-toggle";

const dark = document.querySelector('[data-dark]') as HTMLElement;
const light = document.querySelector('[data-light]') as HTMLElement;
const toggle = document.querySelector('.js-theme-toggle') as HTMLElement;

new ThemeToggle({dark, light, toggle});