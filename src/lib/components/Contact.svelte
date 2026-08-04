<script lang="ts">
	import { env } from '$env/dynamic/public';
	import Loader from './Loader.svelte';
	import InputField from '$lib/components/InputField.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import Toast from '$lib/components/Toast.svelte';

	const WEB3FORMS_ACCESS_KEY = env.PUBLIC_WEB3FORMS_ACCESS_KEY;

	let formStatus = {
		submitting: false,
		submitted: false,
		error: false,
		message: ''
	};

	let formElement: HTMLFormElement;

	const dismissToast = () => {
		formStatus = { ...formStatus, submitted: false };
	};

	const handleSubmit = async (data: SubmitEvent) => {
		formStatus = {
			...formStatus,
			submitting: true,
			submitted: false
		};

		const formData = new FormData(data.currentTarget as HTMLFormElement);
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);
		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: json
			});

			const result = await response.json();

			if (response.ok && result.success) {
				formStatus = {
					submitting: false,
					submitted: true,
					error: false,
					message: "Thanks for your message! I'll get back to you soon."
				};

				if (formElement) {
					formElement.reset();
				}
			} else {
				// Server responded, but rejected the submission — don't clear the form.
				formStatus = {
					submitting: false,
					submitted: true,
					error: true,
					message:
						result.message || 'Something went wrong. Please check your details and try again.'
				};
			}
		} catch (err) {
			// Network failure or unexpected error — don't clear the form.
			const detail = err instanceof Error ? err.message : '';
			formStatus = {
				submitting: false,
				submitted: true,
				error: true,
				message: detail
					? `Something went wrong: ${detail}. Please try again.`
					: 'Something went wrong. Please try again later.'
			};
		}
	};
</script>

<div class="md:p-20 mt-6">
	<h1 class="text-4xl font-serif font-semibold mb-6">Get In Touch</h1>
	<form bind:this={formElement} on:submit|preventDefault={handleSubmit} class="space-y-4">
		<input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />

		<InputField id="name" label="Name" name="name" required={true} />
		<InputField id="email" label="Email" type="email" name="email" required={true} />
		<FormField id="message" label="Message" name="message" required={true} controlType="textarea" />

		<button
			type="submit"
			class="read-more-button text-sm font-bold lg:text-lg"
			disabled={formStatus.submitting}
		>
			{#if formStatus.submitting}
				<span class="mr-2">
					<Loader />
				</span>
				Sending
			{:else}
				Send Message
			{/if}
		</button>
	</form>
</div>

<Toast
	visible={formStatus.submitted}
	message={formStatus.message}
	error={formStatus.error}
	onClose={dismissToast}
/>
