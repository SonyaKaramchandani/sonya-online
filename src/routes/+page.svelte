<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Work from '$lib/components/Work.svelte';
	import IconifyIcon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import resolveConfig from 'tailwindcss/resolveConfig';
	import tailwindConfig from '../../tailwind.config';
	import Icon from '@iconify/svelte';

	const { theme } = resolveConfig(tailwindConfig);
	// workaround for custom color typings
	const colors = theme?.colors as unknown as { [key: string]: string };

	export let data;
	$: work = data.work;

	let isDesktopScreen: boolean;
	let container;

	onMount(async () => {
		const ScreenUtils = await import('$lib/utils/screenUtils');
		isDesktopScreen = ScreenUtils.isDesktop();

		window.addEventListener('resize', () => {
			isDesktopScreen = ScreenUtils.isDesktop();
		});

		container = document.getElementById('hero');

		const text = new Blotter.Text('Sonya Karam', {
			family: "'Pangaia', serif",
			size: isDesktopScreen ? 100 : 50,
			weight: 700,
			fill: colors.text,
			paddingLeft: isDesktopScreen ? 200 : 0,
			paddingRight: isDesktopScreen ? 200 : 0
		});

		let material = new Blotter.LiquidDistortMaterial();

		material.uniforms.uVolatility.value = 0.01;

		let blotter = new Blotter(material, {
			texts: text
		});

		let scope = blotter.forText(text);

		scope.appendTo(container);

		document.addEventListener(
			'mousemove',
			function (ev) {
				material.uniforms.uVolatility.value += Math.abs(ev.movementX) * 0.00005;
				material.uniforms.uVolatility.value += Math.abs(ev.movementY) * 0.00005;
			},
			false
		);

		window.setInterval(function () {
			if (material.uniforms.uVolatility.value > 0.01) {
				material.uniforms.uVolatility.value *= 0.8;
			}
		}, 100);
	});
</script>

<Cursor />
<Header />
<main>
	<div id="landing">
		<div id="hero" class="relative z-2 pt-[20vh] mx-0"></div>
		<!-- <div
		id="scroll-indicator"
		class="bounce text-center absolute z-10 bottom-2 left-1/2 text-secondary"
	>
		<Icon icon="material-symbols:arrow-circle-down" width="3rem" height="3rem" />
	</div> -->
		<div id="bio" class="md:w-1/2 my-[20vh] leading-tight md:text-[2vw]">
			<p>
				Hey, I'm <span class="text-accent">Sonya</span>, a software developer with a background in
				GIS and UX. My work focuses on building engaging and user-centric workflows that make an
				impact.
			</p>
			<a href="/about" class="read-more-button">
				<span>Read more</span>
				<IconifyIcon icon="lucide:chevrons-right" width="1rem" height="1rem" inline />
			</a>
		</div>
	</div>
	<div id="page-container">
		<Work {work} />
	</div>
</main>
<Footer />
