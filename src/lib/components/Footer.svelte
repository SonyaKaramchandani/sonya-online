<script>
	import IconLinkedIn from 'virtual:icons/lucide/linkedin';
	import IconGithub from 'virtual:icons/lucide/github';
	import IconMail from 'virtual:icons/lucide/mail';
</script>

<footer class="pt-40 pb-4 px-6 md:px-12 lg:px-16 text-background md:text-[2vw] 2xl:text-[1.25vw]">
	<div id="footer-contents" class="px-[4vw]">
		<div id="breakdown" class="text-start pb-10 text-text mix-blend-lighten">
			Designed in <a href="https://www.figma.com/">Figma</a> and coded in
			<a href="https://code.visualstudio.com/">Visual Studio Code</a> by me. Built with
			<a href="https://kit.svelte.dev/">SvelteKit</a>,
			<a href="https://www.curtainsjs.com/">curtains.js</a>
			and <a href="https://tailwindcss.com/">TailwindCSS</a>, deployed with
			<a href="https://vercel.com/">Vercel</a>.
			<br />
			<br />
			Pangaia & Neue Montreal typefaces by
			<a href="https://pangrampangram.com">Pangram Pangram</a>.
		</div>
		<div id="links-container" class="grid justify-items-start gap-x-10 pb-4 mix-blend-hard-light">
			<div id="linkedin">
				<IconLinkedIn style="vertical-align:text-bottom; display:inline-block" />
				<span>LinkedIn</span>
			</div>
			<div id="github">
				<IconGithub style="vertical-align:text-bottom; display:inline-block" />
				<span>Github</span>
			</div>
			<div id="email">
				<IconMail style="vertical-align:text-bottom; display:inline-block" />
				<span>hello@sonya.dev</span>
			</div>
		</div>
	</div>

	<div class="font-serif font-bold text-[11.2vw] text-center mix-blend-hard-light">
		Let's get in touch
	</div>
</footer>
