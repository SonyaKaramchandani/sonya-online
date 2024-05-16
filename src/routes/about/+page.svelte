<script lang="ts">
	import Cursor from '$lib/components/Cursor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import RichText from '$lib/components/RichText.svelte';
	import H1 from '$lib/components/Typography/h1.svelte';
	import H2 from '$lib/components/Typography/h2.svelte';
	import IconifyIcon from '@iconify/svelte';
	import { onMount } from 'svelte';

	export let data;
	$: about = data;

	let isDesktopScreen: boolean;

	onMount(async () => {
		const ScreenUtils = await import('$lib/utils/screenUtils');
		isDesktopScreen = ScreenUtils.isDesktop();

		window.addEventListener('resize', () => {
			isDesktopScreen = ScreenUtils.isDesktop();
		});
	});
</script>

<Cursor />
<Header />
<!-- TODO center all main content -->
<main>
	{#if about}
		<div id="about-container" class="pt-20">
			<div id="about-hero" class="relative">
				<div id="heading-container" class="md:mt-10 absolute">
					<H1 class="drop-shadow-md">{about.title}</H1>
				</div>
				<!-- TODO: resize/style image -->
				<div class="bg-background opacity-75 h-full">
					<img
						src={`${about.image}?h=800&w=800&fit=min`}
						alt="Sonya"
						class="rounded-full object-cover max-w-1/2 max-h-1/2 md:w-1/2 md:h-1/2 mr-8"
					/>
				</div>
				<div
					id="subheading-container"
					class="w-full md:w-1/3 xl:w-1/4 -bottom-5 absolute md:right-1/3 md:top-1/2 text-secondary drop-shadow-md"
				>
					<H2>{about.subtitle}</H2>
				</div>
			</div>
			<div id="description-container" class="py-10 md:ml-[25%]">
				{#if about.description}
					<RichText value={about.description} />
				{/if}
				{#if about.cv}
					<a
						id="cv-download"
						href={about.cv}
						target="_blank"
						rel="noopener noreferrer"
						class="animated-underline-container inline-flex flex-row items-center nowrap transition opacity-1 ease-in-out duration-500 hover:mix-blend-luminosity hover:opacity-75 text-2xl gap-2 lg:mt-6 max-lg:my-6"
					>
						<IconifyIcon
							icon="lucide:download"
							width={isDesktopScreen ? '2.5rem' : '2rem'}
							height={isDesktopScreen ? '2.5rem' : '2rem'}
							inline
						/>
						<span class="lg:text-[1.5vw] text-2xl">Download Resume</span>
					</a>
				{/if}
			</div>
		</div>
	{/if}
</main>
<Footer />
