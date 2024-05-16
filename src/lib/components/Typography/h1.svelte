<script lang="ts">
	let className = '';

	export { className as class };
</script>

<h1 class="{className} text-5xl md:text-[4vw] leading-none font-serif font-bold relative z-10">
	<slot />
</h1>
