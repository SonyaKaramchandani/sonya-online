<script lang="ts">
	import { env } from '$env/dynamic/public';
	import FormField from '$lib/components/FormField.svelte';
	import InputField from '$lib/components/InputField.svelte';
	import RadioGroup from '$lib/components/RadioGroup.svelte';
	import CheckboxGroup from '$lib/components/CheckboxGroup.svelte';
	import FormSection from '$lib/components/FormSection.svelte';
	import TierCard from '$lib/components/TierCard.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Loader from '$lib/components/Loader.svelte';

	const WEB3FORMS_ACCESS_KEY = env.PUBLIC_WEB3FORMS_ACCESS_KEY;

	let formStatus = {
		submitting: false,
		submitted: false,
		error: false,
		message: ''
	};

	let formElement: HTMLFormElement;
	let errors: Record<string, string> = {};
	let showOtherFeatures = false;

	const dismissToast = () => {
		formStatus = { ...formStatus, submitted: false };
	};

	const getSelectedFieldValue = (form: HTMLFormElement, name: string) => {
		const checkedRadio = form.querySelector(
			`input[name="${name}"]:checked`
		) as HTMLInputElement | null;
		if (checkedRadio?.value) {
			return checkedRadio.value;
		}

		const select = form.querySelector(`select[name="${name}"]`) as HTMLSelectElement | null;
		return select?.value ?? '';
	};

	const validateForm = (form: HTMLFormElement) => {
		errors = {};

		const fullName = (form.querySelector('#name') as HTMLInputElement | null)?.value.trim() ?? '';
		const email = (form.querySelector('#email') as HTMLInputElement | null)?.value.trim() ?? '';
		const countryValue = getSelectedFieldValue(form, 'Country');
		const vision =
			(form.querySelector('#vision') as HTMLTextAreaElement | null)?.value.trim() ?? '';
		const packageTierValue = getSelectedFieldValue(form, 'Package tier');
		const projectTypeValue = getSelectedFieldValue(form, 'Project type');
		const featuresOther =
			(form.querySelector('#features-other') as HTMLInputElement | null)?.value.trim() ?? '';

		if (!fullName) {
			errors.name = 'Please enter your full name.';
		}

		if (!email) {
			errors.email = 'Please enter your email address.';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Please enter a valid email address.';
		}

		if (!countryValue) {
			errors.country = 'Please select your country.';
		}

		if (!projectTypeValue) {
			errors.projectType = 'Please choose a project type.';
		}

		if (!vision) {
			errors.vision = 'Please describe the project.';
		}

		if (!packageTierValue) {
			errors.packageTier = 'Please select a package tier.';
		}

		if (!featuresOther && showOtherFeatures) {
			errors.featuresOther = 'Please specify other features.';
		}

		return Object.keys(errors).length === 0;
	};

	const handleFeatureToggle = (event: CustomEvent<{ value: string; checked: boolean }>) => {
		showOtherFeatures = event.detail.value === 'Other' && event.detail.checked;
	};

	const handleSubmit = async (event: SubmitEvent) => {
		const form = event.currentTarget as HTMLFormElement;

		if (!validateForm(form)) {
			// Client-side validation failed — leave the form exactly as the user left it.
			formStatus = {
				submitting: false,
				submitted: true,
				error: true,
				message: 'Please fix the highlighted fields before submitting.'
			};
			return;
		}

		formStatus = {
			...formStatus,
			submitting: true,
			submitted: false
		};

		const formData = new FormData(form);
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);

		try {
			const response = await fetch(form.action, {
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
					message:
						"Thanks for sending me your project details! I'll follow up within 2-3 business days."
				};

				if (formElement) {
					formElement.reset();
				}
				showOtherFeatures = false;
				errors = {};
			} else {
				// Server rejected the submission — don't clear the form.
				formStatus = {
					submitting: false,
					submitted: true,
					error: true,
					message:
						result.message || 'Something went wrong while sending the form. Please try again.'
				};
			}
		} catch (err) {
			// Network failure or unexpected error — don't clear the form.
			console.error(err);
			const detail = err instanceof Error ? err.message : '';
			formStatus = {
				submitting: false,
				submitted: true,
				error: true,
				message: detail
					? `Something went wrong: ${detail}. Please try again.`
					: 'Something went wrong while sending the form. Please try again.'
			};
		}
	};
</script>

<div class="mx-auto max-w-4xl pb-16 pt-28 text-text">
	<div class="mb-10 max-w-3xl">
		<h1 class="font-serif text-5xl md:text-6xl text-secondary">Let's start with the details.</h1>
		<p class="mt-4 text-base text-text/80 md:text-lg">
			I'd love to bring your website to life! First, I need to get to know more about you, and your
			project. The more specific you are, the better I can put together an accurate quote and
			timeline. I typically reply within 2-3 business days.
		</p>
	</div>

	<form
		id="intake-form"
		bind:this={formElement}
		action="https://api.web3forms.com/submit"
		method="POST"
		on:submit|preventDefault={handleSubmit}
		class="space-y-0"
	>
		<input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
		<input type="hidden" name="subject" value="New project intake submission" />
		<input type="checkbox" name="botcheck" class="sr-only" tabindex="-1" autocomplete="off" />
		<input type="hidden" name="from_name" value="Project Intake Form" />
		<input type="hidden" name="redirect" value="false" />

		<FormSection
			stepNumber="01"
			title="Who am I talking to?"
			description="Tell me about yourself or your organization, and how I can contact you."
			columns="2"
		>
			<InputField
				id="name"
				label="Full name"
				required={true}
				error={errors.name}
				name="Full name"
				placeholder="Your full name"
			/>
			<InputField
				id="business"
				label="Organization name"
				name="Business name"
				placeholder="Leave blank if this is a personal project"
			/>
			<InputField
				id="email"
				label="Email"
				required={true}
				error={errors.email}
				type="email"
				name="Email"
				placeholder="your@email.com"
			/>
			<RadioGroup
				legend="Preferred contact method"
				name="Preferred contact method"
				options={[
					{ label: 'Email', value: 'Email' },
					{ label: 'WhatsApp', value: 'WhatsApp' },
					{ label: 'Signal', value: 'Signal' },
					{ label: 'Discord', value: 'Discord' }
				]}
			/>
			<RadioGroup
				legend="Country"
				name="Country"
				widthClass="col-span-2"
				required={true}
				error={errors.country}
				hint="I currently only work with clients in Canada and the United States."
				options={[
					{ label: 'Canada', value: 'Canada' },
					{ label: 'United States', value: 'United States' }
				]}
			/>
			<InputField
				id="referral"
				widthClass="col-span-2"
				label="How did you hear about me?"
				name="Referral source"
				placeholder="Friend, Google, Instagram, etc."
			/>
		</FormSection>

		<FormSection
			stepNumber="02"
			title="Tell me about your website."
			description="I'd like to understand your goals, your audience, and what you want the website to do."
			columns="2"
		>
			<RadioGroup
				legend="Project type"
				name="Project type"
				required={true}
				error={errors.projectType}
				options={[
					{ label: 'Brand new website, nothing exists yet', value: 'New' },
					{ label: 'Redesign of an existing site', value: 'Redesign' },
					{
						label: 'Build from wireframes or designs I already have',
						value: 'Wireframe Build'
					},
					{
						label: 'Ongoing maintenance or support for an existing site',
						value: 'Maintenance/Support'
					},
					{ label: 'Not sure yet', value: 'Unsure' }
				]}
			/>

			<InputField
				id="pages"
				label="Web pages needed"
				name="Page list"
				required={true}
				placeholder="Home, about, contact, services, faq, etc."
			/>
			<InputField
				id="url"
				widthClass="col-span-2"
				label="Existing website URL"
				name="Url"
				type="url"
				placeholder="https://my-website.com"
			/>
			<FormField
				id="vision"
				label="Project description"
				required={true}
				error={errors.vision}
				controlType="textarea"
				name="Project description"
				placeholder="What is this website for, who's the audience, and what should someone do after landing on it?"
				ariaInvalid={errors.vision ? 'true' : 'false'}
				widthClass="col-span-2"
			/>
			<RadioGroup
				legend="Do you have existing brand assets?"
				name="Existing assets"
				required={true}
				error={errors.existingAssets}
				options={[
					{
						label: 'Yes, I will have a logo, artwork, colors, fonts, and content',
						value: 'Yes'
					},
					{ label: 'Some, I need help putting them together', value: 'Some' },
					{ label: "No, I'm starting from scratch", value: 'No' }
				]}
				widthClass="col-span-2"
			/>

			<FormField
				id="inspiration"
				label="Inspiration or references"
				controlType="textarea"
				name="Inspiration links"
				placeholder="What look and feel are you going for? Pinterest boards, mood boards, sites you love or hate are all welcome. One link per line, please!"
				widthClass="col-span-2"
			/>

			<CheckboxGroup
				name="Features"
				legend="Do you need any special features?"
				widthClass="col-span-2"
				on:change={handleFeatureToggle}
				options={[
					{ label: 'Blog', value: 'Blog' },
					{ label: 'Booking or scheduling', value: 'Booking/scheduling' },
					{ label: 'Contact forms', value: 'Contact forms' },
					{ label: 'User accounts', value: 'User accounts' },
					{ label: 'Newsletter signup', value: 'Newsletter signup' },
					{ label: 'Multi-language support', value: 'Multi-language' },
					{ label: 'Custom animation / interactions', value: 'Custom animations' },
					{ label: 'Other', value: 'Other' }
				]}
			/>
			<InputField
				id="features-other"
				label="Other features"
				name="Other features"
				widthClass="col-span-2"
				required={showOtherFeatures}
				error={errors.featuresOther}
				hidden={!showOtherFeatures}
			/>
		</FormSection>

		<FormSection
			stepNumber="03"
			title="Package tier, timelines, and maintenance."
			description="Pick the level of support and scope that best fits the kind of site you need."
			columns="2"
		>
			<fieldset class="col-span-2 space-y-3 border-none p-0">
				<legend class="block text-sm font-semibold uppercase tracking-[0.15em] text-text">
					<span class="inline-flex items-center gap-1">
						Package tier
						<span class="text-accent">*</span>
					</span>
				</legend>
				<div class="grid gap-4 md:grid-cols-3">
					<TierCard
						id="tier-essentials"
						name="Package tier"
						value="Essentials"
						title="Essentials"
						price="$1,500-$3,500"
						fit="A simple, professional site to establish your presence."
						features={[
							'Up to 5 pages',
							'Template-based design',
							'Mobile-responsive',
							'Contact form + basic SEO'
						]}
						required={true}
					/>
					<TierCard
						id="tier-growth"
						name="Package tier"
						value="Growth"
						title="Growth"
						price="$3,500-$8,000"
						fit="A custom-designed site with room to grow."
						features={[
							'Up to 12 pages',
							'Custom UI design',
							'Blog + CMS setup & training',
							'Integrations (booking, newsletter, etc.)'
						]}
					/>
					<TierCard
						id="tier-custom"
						name="Package tier"
						value="Custom"
						title="Custom"
						price="Let's chat"
						fit="Fully branded, e-commerce, or complex functionality."
						features={[
							'Custom scope & strategy',
							'Unlimited pages',
							'E-commerce / membership systems',
							'Full branding & UX design'
						]}
					/>
				</div>
				<p class="text-xs m-2 text-text/80 md:mt-2">
					Please note, that recurring costs like retainers, and hosting fees, domain registration,
					and third-party services are not included in these prices.<br /> This is meant to provide a
					general pricing structure based on the features and level of support needed.
				</p>
			</fieldset>
			{#if errors.packageTier}
				<p class="mt-2 text-xs uppercase tracking-[0.2em] text-error">{errors.packageTier}</p>
			{/if}
			<InputField id="deadline" label="Ideal launch date" type="date" name="Ideal launch date" />
			<RadioGroup
				legend="Who updates the site after launch?"
				name="Post-launch support"
				required={true}
				options={[
					{
						label: 'I want to manage it myself. Set me up with a Content Management System (CMS)',
						value: 'CMS'
					},
					{
						label: "I'd like you to handle updates going forward (retainer)",
						value: 'I want ongoing support/retainer'
					},
					{
						label: 'I just need it built once and the website will remain static after that',
						value: 'Hands off'
					},
					{ label: 'Not sure yet', value: 'Not sure yet' }
				]}
			/>
		</FormSection>

		<FormSection stepNumber="04" title="Anything else?">
			<FormField
				id="notes"
				controlType="textarea"
				name="Additional notes"
				placeholder="Anything additional you'd like to mention. Domain/hosting status, budget constraints, files you'll send separately, etc."
			/>
		</FormSection>

		<div class="flex flex-col gap-4 pt-4 md:flex-row md:items-center md:justify-between">
			<button
				type="submit"
				disabled={formStatus.submitting}
				class="inline-flex items-center justify-center rounded-xl bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-background transition hover:bg-secondary disabled:opacity-70"
			>
				{#if formStatus.submitting}
					<span class="mr-2">
						<Loader />
					</span>
					Sending…
				{:else}
					Send my project details
				{/if}
			</button>
		</div>
	</form>
</div>

<Toast
	visible={formStatus.submitted}
	message={formStatus.message}
	error={formStatus.error}
	onClose={dismissToast}
/>
