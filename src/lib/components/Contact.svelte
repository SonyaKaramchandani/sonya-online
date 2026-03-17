<script lang="ts">
	import { env } from '$env/dynamic/public';
	import Loader from './Loader.svelte';

	const WEB3FORMS_ACCESS_KEY = env.PUBLIC_WEB3FORMS_ACCESS_KEY;

	let formStatus = {
		submitting: false,
		submitted: false,
		error: false,
		message: ''
	};

	let formElement: HTMLFormElement;

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
			if (result.success) {
				console.log(result);
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
				throw new Error(result.message || 'Something went wrong');
			}
		} catch (error) {
			formStatus = {
				submitting: false,
				submitted: true,
				error: true,
				message: 'Something went wrong. Please try again later.'
			};
		}
	};
</script>

<div class="md:p-20 mt-6">
	<h1 class="text-4xl font-serif font-semibold mb-6">Get In Touch</h1>
	<form bind:this={formElement} on:submit|preventDefault={handleSubmit} class="space-y-4">
		<div>
			<input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
			<label for="name" class="block mb-1 font-medium">Name</label>
			<input
				type="text"
				name="name"
				required
				class="w-full p-2 rounded focus:ring-2 focus:outline-none bg-text/5 text-text border border-secondary"
			/>
		</div>

		<div>
			<label for="email" class="block mb-1 font-medium">Email</label>
			<input
				type="email"
				name="email"
				required
				class="w-full p-2 rounded focus:ring-2 focus:outline-none bg-text/5 text-text border border-secondary"
			/>
		</div>

		<div>
			<label for="message" class="block mb-1 font-medium">Message</label>
			<textarea
				name="message"
				required
				rows="4"
				class="w-full p-2 rounded focus:ring-2 focus:outline-none bg-text/5 text-text border border-secondary"
			></textarea>
		</div>
		{#if formStatus.submitted}
			<div
				class={`p-4 mb-6 rounded text-background ${formStatus.error ? 'bg-error' : 'bg-secondary'}`}
			>
				{formStatus.message}
			</div>
		{/if}
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
