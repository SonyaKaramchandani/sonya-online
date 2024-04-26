<script lang="ts">
	import { page } from '$app/stores';
	let path: string;

	$: path = $page.url.pathname;
</script>

<header
	class="fixed top-0 z-30 h-20 flex w-full py-4 px-6 md:px-12 lg:px-16 mix-blend-screen transition-transform ease-in items-center justify-between text-lg font-bold uppercase"
>
	<div class="font-serif-italic text-4xl lowercase font-normal text-reflect">
		<a href="/">SK</a>
	</div>
	<nav class="col-span-10">
		<div id="navigation" class="gap-8 justify-between flex">
			<a href="/about" class="animated-underline {path === '/about' ? 'active' : ''}">About</a>
			<a href="/work" class="animated-underline {path === '/work' ? 'active' : ''}">Work</a>
		</div>
	</nav>
</header>
