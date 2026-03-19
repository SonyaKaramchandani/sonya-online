<script lang="ts">
	import SvgIcon from '$lib/components/SvgIcon.svelte';
	import Body from '$lib/components/Typography/body.svelte';
	import Caption from '$lib/components/Typography/caption.svelte';
	import H1 from '$lib/components/Typography/h1.svelte';
	import H2 from '$lib/components/Typography/h2.svelte';
	import type { Work } from '$lib/typings';
	import IconifyIcon from '@iconify/svelte';
	import { onMount } from 'svelte';

	export let work: Work[] | undefined;

	let isDesktopScreen: boolean;

	onMount(async () => {
		const ScreenUtils = await import('$lib/utils/screenUtils');
		isDesktopScreen = ScreenUtils.isDesktop();

		window.addEventListener('resize', () => {
			isDesktopScreen = ScreenUtils.isDesktop();
		});
	});
</script>

<div id="work" class="pt-[15vh]">
	<H1 class="drop-shadow-md">Selected Works</H1>
	{#if work?.length}
		<div id="works-container" class="py-6 overflow-x-hidden">
			{#each work as project, index}
				<!-- TODO: resize/style image -->
				<article
					id="project-container"
					data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
					class="group max-lg:[&:not(:first-child)]:mt-[10vh] max-lg:[&(:first-child)]:mt-[5vh] lg:[&:not(:first-child)]:mt-[20vh] lg:[&(:first-child)]:mt-[10vh]"
				>
					{#if project.image}
						<div id="project-image" class="lg:flex lg:justify-center">
							<img
								src={`${project.image}?h=500&w=500&auto=format`}
								alt={project.title}
								class="drop-shadow-md"
								width="500px"
								height="500px"
							/>
						</div>
					{/if}
					<div id="project-info" class="z-4 lg:flex lg:flex-col lg:justify-start">
						<div id="project-info-inner">
							<div id="project-title-container" class="relative w-full max-lg:my-4 lg:space-y-4">
								<H2 class="text-secondary max-lg:my-6">
									{project.title}
								</H2>
								<div id="text-stack-container" class="text-secondary max-lg:my-4">
									{#each project.techstack as tech}
										{#if tech.icon}
											<div class="flex flex-col items-center justify-start">
												<SvgIcon
													data={tech.icon}
													width={isDesktopScreen ? '3rem' : '2rem'}
													height={isDesktopScreen ? '3rem' : '2rem'}
												/>
												<Caption class="mt-2 text-center">{tech.name}</Caption>
											</div>
										{/if}
									{/each}
								</div>
							</div>
							{#if project.description}
								<Body class="lg:pt-4">{project.description}</Body>
								{#if project.url}
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										class="animated-underline-container inline-flex flex-row items-center nowrap transition opacity-1 ease-in-out duration-500 hover:mix-blend-luminosity hover:opacity-75 text-2xl gap-2 lg:mt-6 max-lg:my-6"
									>
										<IconifyIcon
											icon="lucide:external-link"
											width={isDesktopScreen ? '2.5rem' : '2rem'}
											height={isDesktopScreen ? '2.5rem' : '2rem'}
											inline
										/>
										<span class="lg:text-[1.5vw] text-2xl">View project</span>
									</a>
								{/if}
							{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</div>
