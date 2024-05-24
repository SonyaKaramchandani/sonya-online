<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Work from '$lib/components/Work.svelte';
	import IconifyIcon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import resolveConfig from 'tailwindcss/resolveConfig';
	import tailwindConfig from '../../tailwind.config';

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
	<div id="hero" class="w-100 relative z-2 pt-[20vh] pb-[10vh] mx-0"></div>
	<div id="bio" class="md:w-1/2 my-[10vh] leading-tight md:text-[2vw]">
		<p>
			Hey there! I'm <span class="text-accent">Sonya</span>, a full-stack developer with a
			multidisciplinary approach to problem-solving. My work focuses on building tools and workflows
			that are beautiful, engaging, and user-centric.
			<a
				href="/about"
				class="animated-underline-container inline-flex flex-row items-center nowrap transition opacity-1 ease-in-out duration-500 hover:mix-blend-luminosity hover:opacity-75 gap-2"
			>
				<span>Read more</span>
				<IconifyIcon
					icon="lucide:circle-arrow-right"
					width={isDesktopScreen ? '2.5rem' : '2rem'}
					height={isDesktopScreen ? '2.5rem' : '2rem'}
					inline
				/>
			</a>
		</p>
	</div>
	<Work {work} />
</main>
<Footer />
