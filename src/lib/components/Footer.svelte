<script>
	import Icon from '@iconify/svelte';
</script>

<footer class="pt-40 pb-4 px-6 md:px-12 lg:px-16">
	<div
		id="footer-contents"
		class="flex flex-col md:flex-row gap-20 md:gap-36 pb-10 text-[clamp(1rem,1.75vw,1.75vw)]"
	>
		<div id="breakdown" class="text-start text-text">
			Designed in <a
				href="https://www.figma.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="animated-underline">Figma</a
			>
			and coded in
			<a
				href="https://code.visualstudio.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="animated-underline">Visual Studio Code</a
			>. Built with
			<a
				href="https://kit.svelte.dev/"
				target="_blank"
				rel="noopener noreferrer"
				class="animated-underline">SvelteKit</a
			>,
			<a
				href="https://www.curtainsjs.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="animated-underline">curtains.js</a
			>
			and
			<a
				href="https://tailwindcss.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="animated-underline">TailwindCSS</a
			>, deployed with
			<a
				href="https://vercel.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="animated-underline">Vercel</a
			>.
			<br />
			<br />
			Pangaia & Neue Montreal typefaces by
			<a
				href="https://pangrampangram.com"
				target="_blank"
				rel="noopener noreferrer"
				class="animated-underline">Pangram Pangram</a
			>.
		</div>
		<div id="links-container" class="text-text">
			<a
				id="linkedin"
				class="icon-text-pair animated-underline"
				target="_blank"
				rel="noopener noreferrer"
				href="https://www.linkedin.com/in/sonya-k/"
			>
				<Icon icon="lucide:linkedin" />LinkedIn
			</a>

			<a
				id="github"
				class="icon-text-pair animated-underline"
				target="_blank"
				rel="noopener noreferrer"
				href="https://github.com/SonyaKaramchandani"
			>
				<Icon icon="lucide:github" />GitHub
			</a>

			<a
				id="email"
				class="icon-text-pair animated-underline"
				target="_blank"
				rel="noopener noreferrer"
				href="mailto:hello@sonya.dev"
			>
				<Icon icon="lucide:mail" />hello@sonyakaram.com
			</a>
		</div>
	</div>
	<div id="footer-container">
		<div class="font-serif font-bold text-[clamp(2rem,12vw,13vw)] text-center mix-blend-hard-light">
			Let's get in touch
		</div>
	</div>
</footer>
