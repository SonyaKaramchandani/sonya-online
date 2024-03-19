<script>
	import TextBlock from '$lib/components/TextBlock.svelte';
	import ScrollText from '$lib/components/ScrollText.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div id="canvas"></div>
<header
	class="fixed top-0 z-30 h-20 flex w-full py-4 px-6 md:px-12 lg:px-16 mix-blend-difference transition-transform ease-in items-center justify-between text-xl font-bold"
>
	<a href="/">SK</a>
	<nav class="col-span-10">
		<div class="gap-8 justify-between flex">
			<a href="/about"><span>About</span></a>
			<a href="/work"><span>Work</span></a>
		</div>
	</nav>
</header>
<main>
	<ScrollText />
	<div id="content">
		<h1>
			<span class="text-plane">Sonya Karam</span>
		</h1>
		<h2>
			<span class="text-plane">
				Software dev<br />
				with a flair for
			</span>
		</h2>
		<TextBlock id="bio">
			<p>
				<span class="text-plane">
					I am a remote-friendly software developer with a multi-disciplinary approach to problem
					solving. My work focuses on building tools and workflows that are beautiful, engaging, and
					user-friendly.
				</span>
			</p>
			<p>
				<span class="text-plane">
					You can find examples of my work here. I can help you build your website, perform
					maintainance, or add some finishing touches to make it really shine.
					<br />
					<!-- TODO: arrow to footer -->
					To collab, get in touch below.
				</span>
			</p>
		</TextBlock>

		<TextBlock id="extras">
			<p>
				<span class="text-plane">
					In my free time, I volunteer with Scarborough Environmental Association, doing web
					development and community work.
					<br />
					When I'm not coding, you can find me on the yoga mat, bouldering, or diving into a good book.
				</span>
			</p>
		</TextBlock>

		<TextBlock id="objective">
			<p>
				<span class="text-plane">
					Currently seeking remote impact-driven roles based in Canada in the Outdoor and Climate
					Tech industries.
				</span>
			</p>
			<p>
				<span class="text-plane"> Also offering freelance web development services.</span>
			</p>
		</TextBlock>
	</div>
</main>
<Footer />
