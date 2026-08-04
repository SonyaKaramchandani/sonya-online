<script lang="ts">
	export let visible = false;
	export let message = '';
	export let error = false;
	export let onClose: () => void = () => {};

	let timeoutId: ReturnType<typeof setTimeout>;

	$: if (visible) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			onClose();
		}, 5000);
	}
</script>

{#if visible}
	<div
		role="status"
		aria-live="polite"
		class={`fixed bottom-6 right-6 z-50 max-w-sm rounded-xl px-5 py-4 text-sm font-medium text-background shadow-lg transition ${
			error ? 'bg-error' : 'bg-secondary'
		}`}
	>
		<div class="flex items-start gap-3">
			<p class="flex-1">{message}</p>
			<button
				type="button"
				on:click={onClose}
				aria-label="Dismiss notification"
				class="text-background/80 transition hover:text-background"
			>
				&times;
			</button>
		</div>
	</div>
{/if}
