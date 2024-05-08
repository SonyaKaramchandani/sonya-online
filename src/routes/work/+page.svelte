<script lang="ts">
	import Cursor from '$lib/components/Cursor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import SvgIcon from '$lib/components/SvgIcon.svelte';
	import Body from '$lib/components/Typography/body.svelte';
	import Caption from '$lib/components/Typography/caption.svelte';
	import H1 from '$lib/components/Typography/h1.svelte';
	import H2 from '$lib/components/Typography/h2.svelte';
	import Icon from '@iconify/svelte';
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

	// $: desktop_class = isDesktopScreen ? '3rem' : '1rem';
</script>

<Cursor />
<Header />
<!-- {console.log(isDesktopScreen)} -->
<!-- TODO center all main content -->
<main class="pt-20 pb-4 px-6 md:px-12 lg:px-16">
	<H1 class="mt-10 drop-shadow-md">Selected Works</H1>
	{#if work?.length}
		<div id="works-container" class="py-6">
			{#each work as project}
				<!-- TODO: resize/style image -->
				<article
					id="project-container"
					class="group lg:flex items-center lg:[&:not(:first-child)]:mt-[20vh] lg:[&(:first-child)]:mt-[10vh] mx-auto even:flex-row-reverse"
				>
					{#if project.image}
						<div id="project-image" class="lg:w-[37.5%] lg:flex lg:odd:justify-end">
							<img src={project.image} alt={project.title} class="drop-shadow-md" />
						</div>
					{/if}
					<div id="project-info" class="lg:flex z-4 lg:w-[50%] lg:group-even:justify-end">
						<div id="project-info-inner" class="lg:group-odd:pl-[3.5vw] lg:group-even:pr-[3.5vw]">
							<div
								id="project-title-container"
								class="lg:flex flex-nowrap relative w-full group-even:flex-row-reverse"
							>
								<H2
									class="text-secondary lg:group-odd:mr-10 lg:group-even:ml-10 lg:w-min lg:group-even:text-end"
								>
									{project.title}
								</H2>
								<div
									id="text-stack-container"
									class="flex gap-4 items-center text-secondary flex-auto lg:group-even:flex-row-reverse flex-wrap"
								>
									{#each project.techstack as tech}
										{#if tech.icon}
											<div class="flex flex-col items-center">
												<SvgIcon
													data={tech.icon}
													width={isDesktopScreen ? '3rem' : '2rem'}
													height={isDesktopScreen ? '3rem' : '2rem'}
												/>
												<Caption class="mt-2">{tech.name}</Caption>
											</div>
										{/if}
									{/each}
								</div>
							</div>
							{#if project.description}
								<!-- TODO: pass props up from CustomParagraph Component -->
								<Body class="lg:pt-4">{project.description}</Body>
								{#if project.url}
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex flex-row items-center nowrap transition opacity-1 ease-in-out duration-500 hover:mix-blend-luminosity hover:opacity-75 text-2xl gap-2 mt-6"
									>
										<Icon icon="ph:arrow-circle-right-thin" width="4rem" height="4rem" inline />
										<span>View project</span>
									</a>
								{/if}
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</main>
<Footer />
