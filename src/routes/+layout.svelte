<script>
	import '../app.css';
	import { fade } from 'svelte/transition';
	import 'aos/dist/aos.css';
	import AOS from 'aos';
	import { onMount } from 'svelte';
	import Analytics from '$lib/components/Analytics.svelte';

	onMount(() => {
		AOS.init({
			once: true,
			mirror: true,
			easing: 'ease-in-out',
			duration: 1000
		});
		// window.addEventListener('load', AOS.refresh);
	});

	export let data;

	$: pathname = data.pathname;
</script>

<!-- TODO: make page transitions more fun -->
{#key pathname}
	<div in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
		<slot />
	</div>
	<Analytics />
{/key}
