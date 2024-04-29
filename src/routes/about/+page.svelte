<script lang="ts">
	import Cursor from '$lib/components/Cursor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import H1 from '$lib/components/Typography/h1.svelte';
	import H2 from '$lib/components/Typography/h2.svelte';

	export let data;
	$: about = data;
</script>

<Cursor />
<Header />
<!-- TODO center all main content -->
<main class="pt-20 pb-4 px-6 md:px-12 lg:px-16">
	{#if about}
		<div id="about-container" class="">
			<div id="about-hero" class="relative">
				<div id="heading-container" class="md:mt-10 absolute">
					<H1>{about.title}</H1>
				</div>
				<!-- TODO: resize/style image -->
				<div class="bg-background opacity-60 h-full">
					<img
						src={`${about.image}?h=800&w=800&fit=min`}
						alt="Sonya"
						class="rounded-full object-cover max-w-1/2 max-h-1/2 md:w-1/2 md:h-1/2 mr-8"
					/>
				</div>
				<div
					id="subheading-container"
					class="w-full md:w-1/3 lg:w-1/4 -bottom-5 absolute md:right-1/3 md:top-1/2 text-secondary"
				>
					<H2><span class="m-2">{about.subtitle}</span></H2>
				</div>
			</div>
			{#if about.description}
				<div id="description-container" class="py-10 ml-[25%]">
					<RichText value={about.description} />
				</div>
			{/if}
		</div>
	{/if}
</main>
<Footer />
