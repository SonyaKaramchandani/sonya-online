<script lang="ts">
	import TextBlock from '$lib/components/TextBlock.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Work from '$lib/components/Work.svelte';
	import H2 from '$lib/components/Typography/h2.svelte';
	import IconifyIcon from '@iconify/svelte';
	import { onMount } from 'svelte';

	export let data;
	$: work = data.work;

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
<main>
	<div id="content" class="w-100 relative z-2">
		<div
			class="text-center my-[25vh] mx-0 md:text-[10vw] text-5xl font-serif font-bold relative z-10"
		>
			Sonya Karam
		</div>
		<H2 class="!font-sans !font-normal w-1/4 my-[14vh] ml-[50%]">Software dev with a flair for</H2>
		<TextBlock id="bio">
			<p>
				Hey there! I'm <span class="text-accent">Sonya</span>, a full-stack developer with a
				multidisciplinary approach to problem-solving. My work focuses on building tools and
				workflows that are beautiful, engaging, and user-centric.
			</p>
			<a
				href="/about"
				class="animated-underline-container inline-flex flex-row items-center nowrap transition opacity-1 ease-in-out duration-500 hover:mix-blend-luminosity hover:opacity-75 gap-2 lg:mt-6 max-lg:my-6"
			>
				<span>Read more</span>
				<IconifyIcon
					icon="lucide:circle-arrow-right"
					width={isDesktopScreen ? '3rem' : '2rem'}
					height={isDesktopScreen ? '3rem' : '2rem'}
					inline
				/>
			</a>
		</TextBlock>
	</div>
	<Work {work} />
</main>
<Footer />
