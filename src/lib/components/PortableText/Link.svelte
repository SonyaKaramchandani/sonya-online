<script lang="ts">
	import type { MarkComponentProps } from '@portabletext/svelte';

	export let portableText: MarkComponentProps<{ href: string }>;
</script>

<a class="animated-underline thin text-strong" href={portableText.value.href} target="_blank">
	<slot />
</a>
