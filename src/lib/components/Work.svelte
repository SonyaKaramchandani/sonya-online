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
	<H1 class="lg:mt-10 drop-shadow-md">Selected Works</H1>
	{#if work?.length}
		<div id="works-container" class="py-6 overflow-x-hidden">
			{#each work as project, index}
				<!-- TODO: resize/style image -->
				<article
					id="project-container"
					data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
					class="group lg:flex items-center lg:[&:not(:first-child)]:mt-[20vh] lg:[&(:first-child)]:mt-[10vh] mx-auto even:flex-row-reverse max-lg:[&:not(:first-child)]:mt-[10vh] max-lg:[&(:first-child)]:mt-[5vh]"
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
								class="lg:flex flex-nowrap relative w-full group-even:flex-row-reverse items-center max-lg:my-4"
							>
								<H2
									class="text-secondary lg:group-odd:mr-10 lg:group-even:ml-10 lg:w-fit max-lg:my-6"
								>
									{project.title}
								</H2>
								<div
									id="text-stack-container"
									class="flex gap-4 items-center text-secondary flex-auto lg:group-even:flex-row-reverse flex-wrap max-lg:my-4"
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
