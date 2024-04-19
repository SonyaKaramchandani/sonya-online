<!-- CustomParagraph (blockStyle) -->
<script lang="ts">
	import type { BlockComponentProps } from '@portabletext/svelte';
	import type { PortableTextBlock } from '@portabletext/types';

	export let portableText: BlockComponentProps;

	$: ({ indexInParent, global, value } = portableText);
	$: ({ ptBlocks } = global);

	$: precededByHeading = ['h1', 'h2', 'h3', 'h4', 'h5'].includes(
		(ptBlocks[indexInParent - 1] as PortableTextBlock)?.style!
	);

	$: anchorId = `paragraph-${value._key}`;
</script>

<!-- If preceded by heading, have a higher margin top -->
<div class="relative {precededByHeading ? 'mt-4' : ''}" id={anchorId}>
	<p class="md:text-[2vw]"><slot /></p>
</div>
