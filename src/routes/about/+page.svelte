<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import RichText from '$lib/components/RichText.svelte';

	export let data;
	$: about = data;
</script>

<Header />
<!-- TODO center all main content -->
<main class="pt-20 pb-4 px-6 md:px-12 lg:px-16">
	{#if about}
		<h1>{about.title}</h1>
		<!-- TODO: resize/style image -->
		<img src={about.image} alt="Sonya" />
		{#if about.description}
			<RichText value={about.description} />
		{/if}
	{/if}
</main>
<Footer />
