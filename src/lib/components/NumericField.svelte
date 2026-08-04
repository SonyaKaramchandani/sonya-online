<script lang="ts">
	import FormField from '$lib/components/FormField.svelte';

	export let id: string | undefined = undefined;
	export let label: string = '';
	export let required: boolean = false;
	export let error: string = '';
	export let hint: string = '';
	export let name: string = '';
	export let min: number | string | undefined = undefined;
	export let max: number | string | undefined = undefined;
	export let step: number | string = 1;
	export let placeholder: string = '';
	export let inputClass: string = '';
	export let widthClass: string = '';
</script>

<FormField {id} {label} {required} {error} {hint} {widthClass} controlType="input">
	<input
		{id}
		{name}
		type="number"
		{required}
		{min}
		{max}
		{step}
		{placeholder}
		aria-invalid={error ? 'true' : 'false'}
		class:border-error={error}
		class={`w-full rounded-xl border border-text/25 bg-background/60 px-4 py-3 text-text outline-none placeholder:text-text/50 transition focus:border-accent focus:ring-2 focus:ring-accent/40 ${inputClass}`.trim()}
	/>
</FormField>
