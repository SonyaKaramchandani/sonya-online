export const smoothScroll = (element: HTMLElement) => {
	const offsetTop = element.offsetTop;
	window.scrollTo({
		top: offsetTop,
		behavior: 'smooth'
	});
};
