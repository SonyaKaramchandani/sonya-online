<script lang="ts">
	let className = '';

	export { className as class };
</script>

<p class="{className} lg:text-[2vw] text-2xl xl:leading-12">
	<slot />
</p>
