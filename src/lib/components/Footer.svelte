<script>
	import IconLinkedIn from 'virtual:icons/lucide/linkedin';
	import IconGithub from 'virtual:icons/lucide/github';
	import IconMail from 'virtual:icons/lucide/mail';
</script>

<footer class="pt-40 pb-4 px-6 md:px-12 lg:px-16 text-background md:text-[2vw] 2xl:text-[1.25vw]">
	<div id="breakdown" class="text-start pb-10">
		Designed in <a href="https://www.figma.com/">Figma</a> and coded in
		<a href="https://code.visualstudio.com/">Visual Studio Code</a>. Built with Next.js, curtains.js
		and Tailwind CSS, deployed with Vercel. Text is set in the Pangaia & Noto typefaces.
		<br />
		All work is mine unless stated otherwise.
	</div>
	<div id="links-container" class="grid justify-items-start gap-x-10 pb-4">
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
	<div class="font-serif font-bold text-[12vw] text-center">Let's get in touch</div>
</footer>
