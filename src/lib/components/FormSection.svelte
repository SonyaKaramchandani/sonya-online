<script lang="ts">
	export let stepNumber: string = '';
	export let title: string = '';
	export let description: string = '';
	export let columns: '1' | '2' = '1';
	export let gridClass: string = '';
</script>

<fieldset class="border-b border-text/15 py-8 md:py-10">
	<div class="mb-6 flex items-baseline gap-3">
		<span class="font-mono text-xs uppercase tracking-[0.25em] text-secondary">{stepNumber}</span>
		<legend class="font-serif-italic text-2xl md:text-3xl">{title}</legend>
	</div>

	{#if description}
		<p class="mb-6 text-base text-secondary">{description}</p>
	{/if}

	{#if columns === '2'}
		<div class={`grid gap-4 md:grid-cols-2 md:items-start ${gridClass}`.trim()}>
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
</fieldset>
