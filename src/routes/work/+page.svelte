<script lang="ts">
	import Cursor from '$lib/components/Cursor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import RichText from '$lib/components/RichText.svelte';

	export let data;
	$: work = data.work;
</script>

<Cursor />
<Header />
<!-- TODO center all main content -->
<main class="pt-20 pb-4 px-6 md:px-12 lg:px-16">
	<h1>Work</h1>
	{#if work?.length}
		{#each work as workItem}
			<h2>{workItem.title}</h2>
			<!-- TODO: resize/style image -->
			{#if workItem.image}
				<img src={workItem.image} alt={workItem.title} />
			{/if}
			{#if workItem.description}
				<RichText value={workItem.description} />
			{/if}
			<h2>
				Tech Stack |
				<!-- wrap in flexbox -->
				{#each workItem.techstack as tech}
					{@html tech.icon?.svg}
				{/each}
			</h2>
		{/each}
	{/if}
</main>
<Footer />
