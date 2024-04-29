<!-- CustomHeading (blockStyle) -->
<script lang="ts">
	import type { BlockComponentProps } from '@portabletext/svelte';
	import type { PortableTextBlock } from '@portabletext/types';
	import H1 from '../Typography/h1.svelte';
	import H2 from '../Typography/h2.svelte';
	import H3 from '../Typography/h3.svelte';

	export let portableText: BlockComponentProps;

	$: ({ indexInParent, global, value } = portableText);
	$: ({ ptBlocks } = global);
	$: ({ style } = value);

	$: precededByHeading = ['h1', 'h2', 'h3'].includes(
		(ptBlocks[indexInParent - 1] as PortableTextBlock)?.style!
	);

	$: anchorId = `heading-${value._key}`;
</script>

<!-- If preceded by heading, have a higher margin top -->
<div class="relative {precededByHeading ? 'mt-10' : 'mt-6'}" id={anchorId}>
	{#if style === 'h1'}
		<H1><slot /></H1>
	{:else if style === 'h2'}
		<H2><slot /></H2>
	{:else}
		<H3><slot /></H3>
	{/if}
</div>
