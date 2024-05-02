<script lang="ts">
	let className = '';

	export { className as class };
</script>

<h2 class="text-3xl md:text-[3vw] lg:leading-13 font-serif font-bold z-10 {className}">
	<slot />
</h2>
