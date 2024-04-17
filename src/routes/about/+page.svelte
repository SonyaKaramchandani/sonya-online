<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	export let data;
	$: about = data;
</script>

<Header />
<!-- TODO center all main content -->
<main>
	{#if about}
		<h1>{about.title}</h1>
		<!-- TODO: resize/style image -->
		<img src={about.image} alt="Sonya" />
	{/if}
</main>
<Footer />
