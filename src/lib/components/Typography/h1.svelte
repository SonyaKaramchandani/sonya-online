<script lang="ts">
	let className = '';

	export { className as class };
</script>

<h1 class="text-5xl md:text-[4vw] lg:leading-10 font-serif font-bold relative z-10 {className}">
	<slot />
</h1>
