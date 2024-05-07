<script lang="ts">
	import Cursor from '$lib/components/Cursor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import SvgIcon from '$lib/components/SvgIcon.svelte';
	import Body from '$lib/components/Typography/body.svelte';
	import H1 from '$lib/components/Typography/h1.svelte';
	import H2 from '$lib/components/Typography/h2.svelte';
	import Icon from '@iconify/svelte';

	export let data;
	$: work = data.work;
</script>

<Cursor />
<Header />
<!-- TODO center all main content -->
<main class="pt-20 pb-4 px-6 md:px-12 lg:px-16">
	<H1 class="mt-10">Selected Works</H1>
	{#if work?.length}
		<div id="works-container" class="py-6">
			{#each work as project}
				<!-- TODO: resize/style image -->
				<article
					id="project-container"
					class="group lg:flex items-center lg:[&:not(:first-child)]:mt-[20vh] mx-auto even:flex-row-reverse"
				>
					{#if project.image}
						<div id="project-image" class="lg:w-[37.5%] lg:flex lg:odd:justify-end">
							<img src={project.image} alt={project.title} />
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
											<span class="transition ease-in-out duration-200 hover:scale-75">
												<SvgIcon data={tech.icon} width="3vw" height="3vw" />
											</span>
										{/if}
									{/each}
								</div>
							</div>
							{#if project.description}
								<!-- TODO: pass props up from CustomParagraph Component -->
								<Body class="lg:pt-4 lg:text-[1.75vw]">{project.description}</Body>
								{#if project.url}
									<a
										href={project.url}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex flex-row items-center nowrap transition opacity-1 ease-in-out duration-500 hover:mix-blend-luminosity hover:opacity-75 text-3xl gap-2"
									>
										<Icon icon="ph:arrow-circle-right" width="3rem" height="3rem" inline />
										View project
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
