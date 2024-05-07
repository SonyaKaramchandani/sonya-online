<script lang="ts">
	import { spring } from 'svelte/motion';
	import { onMount } from 'svelte';

	let cursorX = 0;
	let cursorY = 0;
	let lastMouseX = 0;
	let lastMouseY = 0;

	// Create spring stores for x, y positions, and height
	let cursorXSpring = spring(cursorX, { stiffness: 0.05, damping: 0.6 });
	let cursorYSpring = spring(cursorY, { stiffness: 0.05, damping: 0.6 });

	let isDesktopScreen: boolean;

	onMount(async () => {
		const ScreenUtils = await import('$lib/utils/screenUtils');
		isDesktopScreen = ScreenUtils.isDesktop;
		// Listen for resize events to update the flag
		window.addEventListener('resize', () => {
			isDesktopScreen = ScreenUtils.isDesktop;
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

{#if isDesktopScreen}
	<div class="custom-cursor" style="left: {$cursorXSpring}px; top: {$cursorYSpring}px;" />
{/if}
