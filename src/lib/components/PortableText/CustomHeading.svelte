<!-- CustomHeading (blockStyle) -->
<script lang="ts">
	import type { BlockComponentProps } from '@portabletext/svelte';
	import type { PortableTextBlock } from '@portabletext/types';

	export let portableText: BlockComponentProps;

	$: ({ indexInParent, global, value } = portableText);
	$: ({ ptBlocks } = global);
	$: ({ style } = value);

	$: precededByHeading = ['h1', 'h2', 'h3', 'h4', 'h5'].includes(
		(ptBlocks[indexInParent - 1] as PortableTextBlock)?.style!
	);

	$: anchorId = `heading-${value._key}`;
</script>

<!-- If preceded by heading, have a higher margin top -->
<div class="relative {precededByHeading ? 'mt-10' : 'mt-6'}" id={anchorId}>
	{#if style === 'h1'}
		<h1 class="text-3xl md:text-[4vw] md:leading-12"><slot /></h1>
	{:else if style === 'h2'}
		<h2 class="text-2xl md:text-[3.5vw]"><slot /></h2>
	{:else}
		<h3 class="text-xl md:text-[2.5vw]"><slot /></h3>
	{/if}
</div>
