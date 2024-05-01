<script lang="ts">
	import type { Icon } from '$lib/typings';
	import { onMount } from 'svelte';

	export let data: Icon;
	export let width = '1rem';
	export let height = '1rem';

	let svgElement: HTMLElement;

	onMount(() => {
		// Parse the SVG string into a DOM element
		const parser = new DOMParser();
		const svgDoc = parser.parseFromString(data.svg, 'image/svg+xml');
		svgElement = svgDoc.documentElement;

		// Manipulate properties of the SVG element
		svgElement.setAttribute('width', width);
		svgElement.setAttribute('height', height);
		svgElement.removeAttribute('style');
	});
</script>

<div class="text-text">
	{#if svgElement}
		{@html svgElement.outerHTML.toString()}
	{/if}
</div>
