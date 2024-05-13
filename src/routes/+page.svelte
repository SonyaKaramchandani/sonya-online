<script lang="ts">
	import TextBlock from '$lib/components/TextBlock.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Cursor from '$lib/components/Cursor.svelte';
	import Work from '$lib/components/Work.svelte';

	export let data;
	$: work = data.work;
</script>

<Cursor />
<Header />
<main>
	<div id="content">
		<!-- TODO: something is causing extra spaces within svelte. Investigate as this is affecting texttexture.js -->
		<h1>
			<span class="text-plane">Sonya Karam</span>
		</h1>
		<h2>
			<span class="text-plane"> Software dev with a flair for </span>
		</h2>
		<TextBlock id="bio">
			<p>
				<span class="text-plane">
					I am a remote friendly software developer with a multidisciplinary approach to
					problem-solving. My work focuses on building tools and workflows that are beautiful,
					engaging, and user-centric.
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
					I also volunteer with the Scarborough Environmental Association, doing web development and
					community work.
					<br />
					When I'm not coding, you can find me on the yoga mat, bouldering, or diving into a good book.
				</span>
			</p>
		</TextBlock>

		<TextBlock id="objective">
			<p>
				<span class="text-plane">
					Currently seeking remote impact-driven roles based in Canada in the Outdoor and Climate
					Tech spaces.
				</span>
			</p>
			<p>
				<span class="text-plane"> Also offering freelance web development services.</span>
			</p>
		</TextBlock>
	</div>
	<Work {work} />
</main>
<Footer />
