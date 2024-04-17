<script lang="ts">
	export let id: string;
</script>

<div {id} class="md:w-1/2 my-[15vh] sm:leading-none md:text-[2vw] 2xl:text-[1.25vw]">
	<slot />
</div>
