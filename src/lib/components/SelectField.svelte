<script lang="ts">
	import FormField from '$lib/components/FormField.svelte';

	export let id: string | undefined = undefined;
	export let label: string = '';
	export let required: boolean = false;
	export let error: string = '';
	export let hint: string = '';
	export let name: string = '';
	export let options: string[] = [];
	export let selectClass: string = '';
	export let widthClass: string = '';
</script>

<FormField {id} {label} {required} {error} {hint} {widthClass} controlType="select">
	<select
		{id}
		{name}
		{required}
		aria-invalid={error ? 'true' : 'false'}
		class:border-error={error}
		class={`w-full rounded-xl border border-text/25 bg-background/60 px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40 ${selectClass}`.trim()}
	>
		{#each options as option}
			<option>{option}</option>
		{/each}
	</select>
</FormField>
