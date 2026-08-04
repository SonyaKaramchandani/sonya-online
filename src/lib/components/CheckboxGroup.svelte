<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type CheckboxOption = {
		label: string;
		value: string;
	};

	export let legend: string = '';
	export let name: string = '';
	export let options: CheckboxOption[] = [];
	export let accentClass: string = 'accent-accent';
	export let widthClass: string = '';
	export let required: boolean = false;
	export let error: string = '';
	export let minRequired: number = 1;
	export let hint: string = '';

	const dispatch = createEventDispatcher();

	const handleChange = (event: Event) => {
		const target = event.currentTarget as HTMLInputElement;
		dispatch('change', {
			value: target.value,
			checked: target.checked
		});
	};
</script>

<fieldset class={`space-y-2 border-none p-0 ${widthClass}`.trim()} data-min-required={minRequired}>
	{#if legend}
		<legend class="block text-sm font-semibold uppercase tracking-[0.15em] text-text">
			<span class="inline-flex items-center gap-1">
				{legend}
				{#if required}
					<span class="text-accent">*</span>
				{/if}
			</span>
		</legend>
	{/if}

	{#if hint}
		<p class="text-xs tracking-[0.05em] text-secondary">{hint}</p>
	{/if}

	<div class="mt-3 flex flex-wrap gap-3">
		{#each options as option}
			<label class="rounded-full border border-text/25 bg-background/60 px-4 py-2 text-sm">
				<input
					type="checkbox"
					{name}
					{required}
					value={option.value}
					on:change={handleChange}
					class={`mr-2 accent-accent ${accentClass}`.trim()}
				/>{option.label}
			</label>
		{/each}
	</div>

	{#if error}
		<p class="mt-2 text-xs uppercase tracking-[0.2em] text-error">{error}</p>
	{/if}
</fieldset>
