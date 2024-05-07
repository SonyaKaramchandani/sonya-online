import defaultTheme from 'tailwindcss/defaultTheme';

export const isDesktop = window.innerWidth >= Number.parseInt(defaultTheme.screens.lg);
