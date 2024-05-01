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
	<H1>Selected Works</H1>
	{#if work?.length}
		<div id="works-container" class="py-6">
			{#each work as project}
				<!-- TODO: resize/style image -->
				<article id="project-container" class="lg:flex relative lg:mt-[20vh] mx-auto">
					{#if project.image}
						<div id="project-image" class="w-[37.5%] relative">
							<img src={project.image} alt={project.title} />
						</div>
					{/if}
					<div id="project-info" class="lg:absolute lg:flex z-4 lg:left-[37.5%]">
						<div id="project-info-inner" class="lg:pl-[3.5vw]">
							<H2 class="text-secondary relative nowrap lg:left-[-12.5vw]">
								{project.title}
							</H2>
							{#if project.description}
								<!-- TODO: pass props up from CustomParagraph Component -->
								<Body>{project.description}</Body>
							{/if}
						</div>

						{#if false}
							<H3>
								Tech Stack |
								<!-- wrap in flexbox -->
								{#each project.techstack as tech}
									{#if tech.icon}
										<SvgIcon data={tech.icon} width="5rem" height="5rem" />
									{/if}
								{/each}
							</H3>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{/if}
</main>
<Footer />
