<script lang="ts">
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';
	import defaultTheme from 'tailwindcss/defaultTheme';

	let cursorX = 0;
	let cursorY = 0;
	let lastMouseX = 0;
	let lastMouseY = 0;

	// Create spring stores for x, y positions, and height
	let cursorXSpring = spring(cursorX, { stiffness: 0.05, damping: 0.6 });
	let cursorYSpring = spring(cursorY, { stiffness: 0.05, damping: 0.6 });

	let isDesktop = false;
	const desktop = Number.parseInt(defaultTheme.screens.lg);

	onMount(() => {
		isDesktop = window.innerWidth >= desktop;

		// Listen for resize events to update the flag
		window.addEventListener('resize', () => {
			isDesktop = window.innerWidth >= desktop;
		});

		// Update cursor position on mousemove
		document.addEventListener('mousemove', (e) => {
			cursorX = e.clientX;
			cursorY = e.clientY;

			cursorXSpring.set(cursorX);
			cursorYSpring.set(cursorY);

			lastMouseX = e.clientX;
			lastMouseY = e.clientY;
		});
	});
</script>

{#if isDesktop}
	<div class="custom-cursor" style="left: {$cursorXSpring}px; top: {$cursorYSpring}px;" />
{/if}
