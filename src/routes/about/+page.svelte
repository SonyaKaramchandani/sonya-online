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
	<div id="page-container">
		{#if about}
			<div id="about-container" class="overflow-x-hidden">
				<div id="about-hero" class="pt-[15vh] relative">
					<div id="heading-container" class="md:mt-10 absolute z-10" data-aos="fade-right">
						<H1 class="drop-shadow-md">{about.title}</H1>
					</div>
					<!-- TODO: resize/style image -->
					<div class="bg-background opacity-75 h-full lg:w-1/2">
						<img
							src={`${about.image}?h=800&w=800&fit=min`}
							alt="Sonya"
							class="rounded-full object-cover mr-8 max-w-/2 max-h-1/2 md:w-2/3 md:h-2/3 max-md:bottom-1/2"
						/>
					</div>
					<div
						id="subheading-container"
						class="w-full md:w-1/3 -bottom-5 absolute md:right-1/3 lg:right-1/2 text-secondary drop-shadow-md z-10"
						data-aos="fade-left"
					>
						<H2>{about.subtitle}</H2>
					</div>
				</div>
				<div id="description-container" class="py-10 md:ml-[25%]" data-aos="fade-left">
					{#if about.description}
						<RichText value={about.description} />
					{/if}
					{#if about.cv}
						<a
							id="cv-download"
							href={`${about.cv}?dl=sonya-karam-resume.pdf`}
							download
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
	</div>
</main>
<Footer />
