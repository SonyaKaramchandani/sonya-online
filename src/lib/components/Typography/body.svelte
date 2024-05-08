<script lang="ts">
	let className = '';

	export { className as class };
</script>

<p class="{className} lg:text-[1.5vw] text-2xl xl:leading-10">
	<slot />
</p>
