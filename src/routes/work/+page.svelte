<script lang="ts">
	import Cursor from '$lib/components/Cursor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import SvgIcon from '$lib/components/SvgIcon.svelte';
	import Body from '$lib/components/Typography/body.svelte';
	import H1 from '$lib/components/Typography/h1.svelte';
	import H2 from '$lib/components/Typography/h2.svelte';
	import H3 from '$lib/components/Typography/h3.svelte';

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
					class="lg:flex relative lg:[&:not(:first-child)]:mt-[20vh] mx-auto"
				>
					{#if project.image}
						<div id="project-image" class="lg:w-[37.5%] relative">
							<img src={project.image} alt={project.title} />
						</div>
					{/if}
					<div id="project-info" class="lg:absolute lg:flex z-4 lg:left-[37.5%]">
						<div id="project-info-inner" class="lg:pl-[3.5vw]">
							<div
								id="project-title-container"
								class="lg:flex lg:no-wrap relative lg:left-[-9.5vw] w-full"
							>
								<H2 class="text-secondary mr-10 mix-blend-exclusion w-min">
									{project.title}
								</H2>
								<div
									id="text-stack-container"
									class="flex gap-4 items-center text-secondary flex-auto"
								>
									{#each project.techstack as tech}
										{#if tech.icon}
											<span class="transition-transform ease-in-out duration-200 hover:scale-75">
												<SvgIcon data={tech.icon} width="3vw" height="3vw" />
											</span>
										{/if}
									{/each}
								</div>
							</div>
							{#if project.description}
								<!-- TODO: pass props up from CustomParagraph Component -->
								<Body class="lg:pt-4">{project.description}</Body>
							{/if}
						</div>

						{#if false}
							<H3>
								Tech Stack |
								<!-- wrap in flexbox -->
							</H3>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{/if}
</main>
<Footer />
