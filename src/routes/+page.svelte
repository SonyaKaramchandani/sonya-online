<script lang="ts">
	import TextBlock from '$lib/components/TextBlock.svelte';
	import ScrollText from '$lib/components/ScrollText.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
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

	onMount(() => {
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
				cursorHeight = Math.max(Math.round(defaultCursorSize - scale), 25);
				cursorWidth = defaultCursorSize;
			} else {
				cursorHeight = defaultCursorSize;
				cursorWidth = Math.max(Math.round(defaultCursorSize - scale), 25);
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

<div
	class="custom-cursor"
	style="left: {$cursorXSpring}px; top: {$cursorYSpring}px; height: {$cursorHeightSpring}px; width: {$cursorWidthSpring}px"
/>
<div id="canvas" />
<Header />
<main>
	<ScrollText />
	<div id="content">
		<h1>
			<span class="text-plane">Sonya Karam</span>
		</h1>
		<h2>
			<span class="text-plane">
				Software dev<br />
				with a flair for
			</span>
		</h2>
		<TextBlock id="bio">
			<p>
				<span class="text-plane">
					I am a remote-friendly software developer with a multi-disciplinary approach to problem
					solving. My work focuses on building tools and workflows that are beautiful, engaging, and
					user-friendly.
				</span>
			</p>
			<p>
				<span class="text-plane">
					You can find examples of my work here. I can help you build your website, perform
					maintainance, or add some finishing touches to make it really shine.
					<br />
					<!-- TODO: arrow to footer -->
					To collab, get in touch below.
				</span>
			</p>
		</TextBlock>

		<TextBlock id="extras">
			<p>
				<span class="text-plane">
					In my free time, I volunteer with Scarborough Environmental Association, doing web
					development and community work.
					<br />
					When I'm not coding, you can find me on the yoga mat, bouldering, or diving into a good book.
				</span>
			</p>
		</TextBlock>

		<TextBlock id="objective">
			<p>
				<span class="text-plane">
					Currently seeking remote impact-driven roles based in Canada in the Outdoor and Climate
					Tech industries.
				</span>
			</p>
			<p>
				<span class="text-plane"> Also offering freelance web development services.</span>
			</p>
		</TextBlock>
	</div>
</main>
<Footer />
