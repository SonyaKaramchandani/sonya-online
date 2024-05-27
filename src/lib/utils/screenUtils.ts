import defaultTheme from 'tailwindcss/defaultTheme';

export const isDesktop = (): boolean => {
	return window.innerWidth >= Number.parseInt(defaultTheme.screens.lg);
};

export const getMousePos = (ev: MouseEvent, body: HTMLElement, document: HTMLElement) => {
	let posx = 0;
	let posy = 0;

	if (ev.pageX || ev.pageY) {
		posx = ev.pageX;
		posy = ev.pageY;
	} else if (ev.clientX || ev.clientY) {
		posx = ev.clientX + body.scrollLeft + document.scrollLeft;
		posy = ev.clientY + body.scrollTop + document.scrollTop;
	}
	return { x: posx, y: posy };
};
