<script lang="ts">
	export let id: string | undefined = undefined;
	export let label: string = '';
	export let required: boolean = false;
	export let error: string = '';
	export let hint: string = '';
	export let controlType: 'input' | 'select' | 'textarea' = 'input';
	export let inputType: string = 'text';
	export let placeholder: string = '';
	export let options: string[] = [];
	export let name: string = '';
	export let ariaInvalid: 'true' | 'false' = 'false';
	export let inputClass: string = '';
	export let selectClass: string = '';
	export let textareaClass: string = '';
	export let widthClass: string = '';
	export let hidden: boolean = false;
</script>

<div class={`space-y-2 ${hidden ? 'hidden' : ''} ${widthClass}`.trim()}>
	{#if label}
		<label for={id} class="block text-sm font-semibold uppercase tracking-[0.15em] text-text">
			<span class="inline-flex items-center gap-1">
				{label}
				{#if required}
					<span class="text-accent">*</span>
				{/if}
			</span>
		</label>
	{/if}
	{#if hint}
		<span class="block text-xs tracking-[0.05em] text-secondary">{hint}</span>
	{/if}
	{#if $$slots.default}
		<slot />
	{:else if controlType === 'textarea'}
		<textarea
			{id}
			{name}
			{placeholder}
			{required}
			aria-invalid={ariaInvalid}
			class:border-error={error}
			class={`min-h-[120px] w-full rounded-xl border border-text/25 bg-background/60 px-4 py-3 text-text outline-none placeholder:text-text/50 transition focus:border-accent focus:ring-2 focus:ring-accent/40 ${textareaClass}`.trim()}
		></textarea>
	{:else if controlType === 'select'}
		<select
			{id}
			{name}
			{required}
			aria-invalid={ariaInvalid}
			class:border-error={error}
			class={`w-full rounded-xl border border-text/25 bg-background/60 px-4 py-3 text-text outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40 ${selectClass}`.trim()}
		>
			{#each options as option}
				<option>{option}</option>
			{/each}
		</select>
	{:else}
		<input
			{id}
			{name}
			type={inputType}
			{placeholder}
			{required}
			aria-invalid={ariaInvalid}
			class:border-error={error}
			class={`w-full rounded-xl border border-text/25 bg-background/60 px-4 py-3 text-text outline-none placeholder:text-text/50 transition focus:border-accent focus:ring-2 focus:ring-accent/40 ${inputClass}`.trim()}
		/>
	{/if}

	{#if error}
		<p class="mt-1 text-xs uppercase tracking-[0.2em] text-error">{error}</p>
	{/if}
</div>
