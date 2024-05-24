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
	import { smoothScroll } from '$lib/utils/smoothScroll';

	const { theme } = resolveConfig(tailwindConfig);
	// workaround for custom color typings
	const colors = theme?.colors as unknown as { [key: string]: string };

	export let data;
	$: work = data.work;

	let workElement: HTMLElement;
	let scrollIndicator: HTMLElement;
	let isDesktopScreen: boolean;
	let container;

	const onScrollButtonClick = () => {
		smoothScroll(workElement);
		if (scrollIndicator.classList.contains('button-visible')) {
			scrollIndicator.classList.add('button-hidden');
			scrollIndicator.classList.remove('button-visible');
		}
	};

	onMount(async () => {
		const ScreenUtils = await import('$lib/utils/screenUtils');
		isDesktopScreen = ScreenUtils.isDesktop();
		workElement = document.getElementById('work') as HTMLDivElement;
		scrollIndicator = document.getElementById('scroll-indicator') as HTMLDivElement;

		window.addEventListener('resize', () => {
			isDesktopScreen = ScreenUtils.isDesktop();
		});

		window.addEventListener('scroll', function () {
			if (window.scrollY > 399 && scrollIndicator.classList.contains('button-visible')) {
				scrollIndicator.classList.add('button-hidden');
				scrollIndicator.classList.remove('button-visible');
			}
		});

		container = document.getElementById('hero');

		const text = new Blotter.Text('Sonya Karam', {
			family: "'Pangaia', serif",
			size: isDesktopScreen ? 150 : 40,
			weight: 700,
			fill: colors.text,
			paddingLeft: isDesktopScreen ? 200 : 10,
			paddingRight: isDesktopScreen ? 200 : 10
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
	<div id="page-container">
		<div id="landing" class="h-screen py-[25vh]">
			<div id="hero" class="z-2 mx-0"></div>
			<button
				id="scroll-indicator"
				class="bounce-animation button-visible text-right absolute z-10 bottom-2 right-2 text-secondary"
				on:click={onScrollButtonClick}
			>
				<Icon
					icon="material-symbols:arrow-circle-down"
					width={isDesktopScreen ? '2rem' : '1.5rem'}
					height={isDesktopScreen ? '2rem' : '1.5rem'}
				/>
			</button>
			<div id="bio" class="md:w-1/2 my-[10vh] leading-tight md:text-[2vw]">
				<p>
					I'm <span class="text-accent">Sonya</span>, a software developer with a background in GIS
					and UX. My work focuses on building engaging and user-centric workflows that make an
					impact.
				</p>
				<a href="/about" class="read-more-button">
					<span>Read more</span>
					<IconifyIcon icon="lucide:chevrons-right" width="1rem" height="1rem" inline />
				</a>
			</div>
		</div>
		<Work {work} />
	</div>
</main>
<Footer />
