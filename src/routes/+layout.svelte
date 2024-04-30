<script>
	import '../app.css';
	import { fade } from 'svelte/transition';

	export let data;

	$: pathname = data.pathname;
</script>

<!-- TODO: make page transitions more fun -->
{#key pathname}
	<div in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
		<slot />
	</div>
{/key}
