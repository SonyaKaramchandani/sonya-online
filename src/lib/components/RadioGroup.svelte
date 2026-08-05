<script lang="ts">
	type RadioOption = {
		label: string;
		value: string;
	};

	export let legend: string = '';
	export let name: string = '';
	export let required: boolean = false;
	export let error: string = '';
	export let options: RadioOption[] = [];
	export let accentClass: string = 'accent-accent';
	export let selectClass: string = '';
	export let widthClass: string = '';
	export let hint: string = '';
</script>

<fieldset class={`space-y-2 border-none p-0 ${widthClass}`.trim()}>
	<legend class="block text-sm font-semibold uppercase tracking-[0.15em] text-text">
		<span class="inline-flex items-center gap-1">
			{legend}
			{#if required}
				<span class="text-accent">*</span>
			{/if}
		</span>
	</legend>

	{#if hint}
		<p class="text-xs tracking-[0.05em] text-secondary">{hint}</p>
	{/if}

	{#if options.length >= 3}
		<div class="mt-3">
			<select
				{name}
				{required}
				aria-invalid={error ? 'true' : 'false'}
				class:border-error={error}
				class={`w-full rounded-xl border border-text/25 bg-background/60 px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40 ${selectClass}`.trim()}
			>
				<option value="">Select one</option>
				{#each options as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>
	{:else}
		<div class="mt-3 flex flex-wrap gap-2">
			{#each options as option}
				<label
					class="flex w-fit max-w-full items-center gap-2 rounded-xl border border-text/25 bg-background/60 px-3 py-2 text-sm"
				>
					<input
						type="radio"
						{name}
						value={option.value}
						{required}
						class={`accent-accent ${accentClass}`.trim()}
					/>
					<span>{option.label}</span>
				</label>
			{/each}
		</div>
	{/if}

	{#if error}
		<p class="mt-2 text-xs uppercase tracking-[0.2em] text-error">{error}</p>
	{/if}
</fieldset>
