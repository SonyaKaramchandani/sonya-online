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
	import { MathUtils } from '$lib/utils/mathUtils';
	import { getMousePos } from '$lib/utils/screenUtils';

	const { theme } = resolveConfig(tailwindConfig);
	// workaround for custom color typings
	const colors = theme?.colors as unknown as { [key: string]: string };

	export let data;
	$: work = data.work;

	let workElement: HTMLElement;
	let scrollIndicator: HTMLElement;
	let isDesktopScreen: boolean;
	let winSize: { width: number; height: number };
	let fontSize: number;
	let padding: number;

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

		const body = document.body;
		const docEl = document.documentElement;
		const hero = document.getElementById('hero')!;
		const landing = document.getElementById('landing');

		const calcWinsize = () => (winSize = { width: window.innerWidth, height: window.innerHeight });
		calcWinsize();

		let mousePos = { x: winSize.width / 2, y: winSize.height / 2 };

		const updateFontSizeAndPadding = () => {
			fontSize = Math.min(Math.max(window.innerWidth * 0.13, 50), 200);
			padding = isDesktopScreen ? Math.min(window.innerWidth * 0.1, 200) : 10;
		};
		updateFontSizeAndPadding();

		const createBlotter = (textSize: number, canvasPadding: number) => {
			const landingText = hero.firstElementChild!;

			const text = new Blotter.Text(landingText?.innerHTML, {
				family: "'Pangaia', serif",
				size: textSize,
				weight: 700,
				fill: colors.text,
				paddingLeft: canvasPadding,
				paddingRight: canvasPadding
			});

			if (document.contains(landingText)) {
				hero.removeChild(landingText);
			}

			const material = new Blotter.LiquidDistortMaterial();
			material.uniforms.uVolatility.value = 0;

			const blotter = new Blotter(material, {
				texts: text
			});

			const scope = blotter.forText(text);
			scope.appendTo(hero);

			let lastMousePosition = { x: winSize.width / 2, y: winSize.height / 2 };
			let volatility = 0;

			const render = () => {
				const docScrolls = {
					left: body.scrollLeft + docEl.scrollLeft,
					top: body.scrollTop + docEl.scrollTop
				};
				const relmousepos = {
					x: mousePos.x - docScrolls.left,
					y: mousePos.y - docScrolls.top
				};

				const mouseDistance = MathUtils.distance(
					lastMousePosition.x,
					relmousepos.x,
					lastMousePosition.y,
					relmousepos.y
				);

				volatility = MathUtils.lerp(
					volatility,
					Math.min(MathUtils.lineEq(0.15, 0, 100, 0, mouseDistance), 0.15),
					0.05
				);

				material.uniforms.uVolatility.value = volatility;

				lastMousePosition = { x: relmousepos.x, y: relmousepos.y };
				requestAnimationFrame(render);
			};
			requestAnimationFrame(render);
		};

		window.addEventListener('scroll', function () {
			if (window.scrollY > 399 && scrollIndicator.classList.contains('button-visible')) {
				scrollIndicator.classList.add('button-hidden');
				scrollIndicator.classList.remove('button-visible');
			}
		});

		landing?.addEventListener('mousemove', (ev) => (mousePos = getMousePos(ev, body, docEl)));

		let resizeTimeout: NodeJS.Timeout;

		window.addEventListener('resize', () => {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(() => {
				isDesktopScreen = ScreenUtils.isDesktop();
				calcWinsize();

				updateFontSizeAndPadding();

				requestAnimationFrame(() => {
					createBlotter(fontSize, padding);
				});
			}, 200);
		});

		createBlotter(fontSize, padding);
	});
</script>

<Cursor />
<Header />
<main>
	<div id="page-container">
		<div id="landing" class="h-screen flex flex-col justify-center">
			<div id="hero" class="z-2 mx-0 py-[6vh]">
				<span class={`initial-landing-text font-serif text-[12vw] font-black`}>Sonya Karam</span>
			</div>
			<div id="bio" class="md:w-1/2 md:leading-tight text-lg md:text-2xl lg:text-[2vw]">
				<p>
					I'm <span class="text-accent">Sonya</span>, a software developer passionate about UX and
					GIS. I build engaging user-centric workflows that make an impact.
				</p>
				<a href="/about" class="read-more-button text-sm lg:text-lg">
					<span>More about me</span>
					<IconifyIcon
						icon="lucide:chevrons-right"
						width={isDesktopScreen ? '1.5rem' : '1rem'}
						height={isDesktopScreen ? '1.5rem' : '1rem'}
						inline
					/>
				</a>
			</div>
			<button
				id="scroll-indicator"
				aria-label="scroll-indicator-button"
				class="bounce-animation button-visible text-right absolute z-10 bottom-2 right-2 text-secondary"
				on:click={onScrollButtonClick}
			>
				<Icon
					icon="material-symbols:arrow-circle-down"
					width={isDesktopScreen ? '2rem' : '1.5rem'}
					height={isDesktopScreen ? '2rem' : '1.5rem'}
				/>
			</button>
		</div>
		<Work {work} />
	</div>
</main>
<Footer />
