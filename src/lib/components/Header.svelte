<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { smoothScroll } from '$lib/utils/smoothScroll';

	let path: string;

	$: path = $page.url.pathname;

	let workElement: HTMLElement;
	let contentElement: HTMLElement;
	let isWorkVisible = false;

	const handleWorkAnchorClick = (event: MouseEvent) => {
		if (path === '/') {
			event.preventDefault();
			smoothScroll(workElement);
		}
	};

	const handleLogoClick = (event: MouseEvent) => {
		if (path === '/') {
			event.preventDefault();
			smoothScroll(contentElement);
		}
	};

	onMount(() => {
		workElement = document.getElementById('work') as HTMLDivElement;
		contentElement = document.getElementById('content') as HTMLDivElement;

		let observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					isWorkVisible = true;
				} else {
					isWorkVisible = false;
				}
			});
		});

		if (path === '/') {
			observer.observe(workElement);
		}

		// Cleanup observer on component destroy
		return () => {
			observer.disconnect();
		};
	});
</script>

<header
	class="fixed top-0 z-30 h-20 flex w-full my-8 px-16 mix-blend-screen transition-transform ease-in items-center justify-between text-lg font-bold uppercase"
>
	<a href="/" on:click={handleLogoClick}
		><div class="text-reflect">
			<img class="logo" height="40" width="40" src="/favicon.png" alt="logo" />
		</div>
	</a>

	<nav class="col-span-10">
		<div id="navigation" class="gap-8 justify-between flex">
			<a href="/about" class="animated-underline {path === '/about' ? 'active' : ''}">About</a>
			<a
				href="/#work"
				on:click={handleWorkAnchorClick}
				class="animated-underline"
				class:active={isWorkVisible}
			>
				Work
			</a>
		</div>
	</nav>
</header>
