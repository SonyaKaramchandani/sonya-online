import defaultTheme from 'tailwindcss/defaultTheme';

export const isDesktop = (): boolean => {
	return window.innerWidth >= Number.parseInt(defaultTheme.screens.lg);
};
