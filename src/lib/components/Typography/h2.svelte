<script lang="ts">
	let className = '';

	export { className as class };
</script>

<h2 class="{className} text-3xl lg:text-[2.5vw] leading-none font-serif font-bold z-10">
	<slot />
</h2>
