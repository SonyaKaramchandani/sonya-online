<script lang="ts">
	export let id: string;
</script>

<div {id} class="md:w-1/2 my-[10vh] leading-tight md:text-[2vw]">
	<slot />
</div>
