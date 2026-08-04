<script lang="ts">
	export let id: string = '';
	export let name: string = '';
	export let value: string = '';
	export let title: string = '';
	export let price: string = '';
	export let fit: string = '';
	export let features: string[] = [];
	export let required: boolean = false;
</script>

<div class="tier-card">
	<input type="radio" {id} {name} {value} {required} class="sr-only" />
	<label
		for={id}
		class="flex h-full flex-col rounded-3xl border border-text/20 bg-background/60 p-5 text-left transition duration-200 hover:border-accent/60 hover:bg-background"
	>
		<span class="tier-name text-2xl font-semibold text-secondary font-serif">{title}</span>
		<span class="tier-price mt-2 text-base font-bold uppercase text-accent">
			{price}
		</span>
		<span class="tier-fit mt-4 text-sm leading-6 text-text/80">{fit}</span>
		<ul class="mt-4 space-y-2 text-sm text-text/80">
			{#each features as feature}
				<li class="flex items-start gap-2">
					<span class="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent"></span>
					<span>{feature}</span>
				</li>
			{/each}
		</ul>
	</label>
</div>
