<script lang="ts">
	import FormAlert from '$lib/formAlert.svelte';
	import FormInput from '$lib/formInput.svelte';
	import type { CredentialInputChangeEvent, CredentialsFormEvent } from '$lib/interfaces';
	import Socials from '$lib/socials.svelte';
	import type { RegisterPayload, AvailableAuthProviders, CredentialsInput } from '$lib/types';
	import { addErrorShake, CredentialsSchema } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<CredentialsFormEvent>();

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		checkAndDispatch(credentialsData);
	};

	export function checkAndDispatch(data: RegisterPayload) {
		credentialsError = {};
		const result = CredentialsSchema.safeParse(data);

		if (!result.success) {
			credentialsError = result.error.flatten().fieldErrors;

			for (const i of Object.keys(credentialsError)) {
				addErrorShake(i);
			}

			return;
		}

		dispatch('submit', result.data);
	}

	const handleSocialLogin = (e: CustomEvent<AvailableAuthProviders>) => {
		dispatch('login', e.detail);
	};

	export let loading: boolean;
	export let error: string | undefined;
	export let credentialsError: { name?: string[]; email?: string[]; password?: string[] } = {};
	export let success: string | undefined;

	export let credentialsData: RegisterPayload = { name: '', email: '', password: '' };

	const handleChange = (e: CustomEvent<CredentialInputChangeEvent>) => {
		credentialsData[e.detail.name] = e.detail.value;
	};
</script>

<form class="w-full" on:submit={handleSubmit}>
	<div class="flex gap-0 lg:gap-3 w-full flex-col lg:flex-row">
		<FormInput
			loading={success ? true : loading}
			type="text"
			placeholder="John Doe"
			name="name"
			label="Name"
			value={credentialsData.name}
			on:change={handleChange}
			required={false}
			errors={credentialsError?.name}
			id="name"
		/>
		<FormInput
			loading={success ? true : loading}
			type="email"
			placeholder="example@domain.com"
			name="email"
			label="Email"
			align="end"
			value={credentialsData.email}
			on:change={handleChange}
			required={false}
			errors={credentialsError?.email}
			id="email"
		/>
	</div>
	<FormInput
		loading={success ? true : loading}
		type="password"
		placeholder="*********"
		name="password"
		label="Password"
		value={credentialsData.password}
		on:change={handleChange}
		required={false}
		errors={credentialsError?.password}
		id="password"
	/>

	<div class="w-full mt-8 flex flex-col gap-3">
		<button
			type="submit"
			class="shadow-lg btn btn-primary w-full {loading ? 'loading btn-disabled' : ''} {success
				? 'btn-disabled'
				: ''}">Next</button
		>

		<FormAlert {error} {success} />
		<a class="btn w-full normal-case shadow-lg" href="/login">Already have an account?</a>
		<div class="divider text-sm prose">Or register with</div>
		<Socials on:login={handleSocialLogin} />
	</div>
</form>
