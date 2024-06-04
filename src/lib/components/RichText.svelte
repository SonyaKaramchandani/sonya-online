<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PortableTextBlock } from '@portabletext/types';
	import Link from './PortableText/Link.svelte';
	import CustomHeading from './PortableText/CustomHeading.svelte';
	import CustomParagraph from './PortableText/CustomParagraph.svelte';
	import CustomListItem from './PortableText/CustomListItem.svelte';
	import CustomUnorderedList from './PortableText/CustomUnorderedList.svelte';
	import CustomOrderedList from './PortableText/CustomOrderedList.svelte';

	export let value: PortableTextBlock[];
</script>

<PortableText
	{value}
	components={{
		marks: {
			link: Link
		},
		block: {
			normal: CustomParagraph,
			h1: CustomHeading,
			h2: CustomHeading,
			h3: CustomHeading
		},
		list: {
			bullet: CustomUnorderedList,
			number: CustomOrderedList
		},
		listItem: {
			bullet: CustomListItem,
			number: CustomListItem
		}
	}}
/>
