<script lang="ts">
	import type { Icon } from '$lib/typings';
	import { afterUpdate } from 'svelte';

	export let data: Icon;
	export let width = '1rem';
	export let height = '1rem';

	let className = '';

	export { className as class };

	let svgElement: HTMLElement;

	afterUpdate(() => {
		// Parse the SVG string into a DOM element
		const parser = new DOMParser();
		const svgDoc = parser.parseFromString(data.svg, 'image/svg+xml');
		svgElement = svgDoc.documentElement;

		svgElement.setAttribute('width', width);
		svgElement.setAttribute('height', height);
		svgElement.removeAttribute('style');
		// Manipulate properties of the SVG element
		svgElement.removeAttribute('style');
		svgElement.setAttribute('path', className);
	});
</script>

<span>
	{#if svgElement}
		{@html svgElement.outerHTML.toString()}
	{/if}
</span>
