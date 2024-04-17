<script lang="ts">
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';

	const defaultCursorSize = 40;
	let cursorX = 0;
	let cursorY = 0;
	let cursorHeight = defaultCursorSize;
	let cursorWidth = defaultCursorSize;
	let lastMouseX = 0;
	let lastMouseY = 0;

	// Create spring stores for x, y positions, and height
	let cursorXSpring = spring(cursorX, { stiffness: 0.1, damping: 0.6 });
	let cursorYSpring = spring(cursorY, { stiffness: 0.1, damping: 0.6 });
	let cursorHeightSpring = spring(cursorHeight, { stiffness: 0.1, damping: 0.6 });
	let cursorWidthSpring = spring(cursorHeight, { stiffness: 0.1, damping: 0.6 });

	let isDesktop = false;

	onMount(() => {
		// Check if the screen width is at least 768px (md breakpoint)
		// TODO: use tailwind config instead
		isDesktop = window.innerWidth >= 768;

		// Listen for resize events to update the flag
		window.addEventListener('resize', () => {
			isDesktop = window.innerWidth >= 768;
		});

		// Update cursor position on mousemove
		document.addEventListener('mousemove', (e) => {
			const deltaX = e.clientX - lastMouseX;
			const deltaY = e.clientY - lastMouseY;

			// Determine the direction of movement
			const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

			// Calculate scale based on the direction
			const scale = isHorizontal ? Math.abs(deltaX) : Math.abs(deltaY);

			cursorX = e.clientX;
			cursorY = e.clientY;

			// Adjust the shape based on the direction
			if (isHorizontal) {
				cursorHeight = Math.max(Math.round(defaultCursorSize - scale), 30);
				cursorWidth = defaultCursorSize;
			} else {
				cursorHeight = defaultCursorSize;
				cursorWidth = Math.max(Math.round(defaultCursorSize - scale), 30);
			}

			cursorXSpring.set(cursorX);
			cursorYSpring.set(cursorY);
			cursorHeightSpring.set(cursorHeight);
			cursorWidthSpring.set(cursorWidth);

			lastMouseX = e.clientX;
			lastMouseY = e.clientY;
		});
	});
</script>

{#if isDesktop}
	<div
		class="custom-cursor"
		style="left: {$cursorXSpring}px; top: {$cursorYSpring}px; height: {$cursorHeightSpring}px; width: {$cursorWidthSpring}px"
	/>
{/if}
