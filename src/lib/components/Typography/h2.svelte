<script lang="ts">
	let className = '';

	export { className as class };
</script>

<h2 class="{className} text-3xl md:text-[3vw] leading-none font-serif font-bold z-10">
	<slot />
</h2>
