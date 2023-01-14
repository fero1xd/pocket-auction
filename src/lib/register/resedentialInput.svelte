<script lang="ts">
	import FormAlert from '$lib/formAlert.svelte';
	import FormInput from '$lib/formInput.svelte';
	import type { ResedentialFormEvent, ResedentialInputChangeEvent } from '$lib/interfaces';
	import Socials from '$lib/socials.svelte';
	import type { AvailableAuthProviders, ResedentialPayload } from '$lib/types';
	import { addErrorShake, ResedentialSchema } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<ResedentialFormEvent>();
	export let loading: boolean;
	export let resedentialData: ResedentialPayload = {
		country: '',
		state: '',
		address1: ''
	};
	let resedentialError: {
		country?: string[];
		state?: string[];
		address1?: string[];
		address2?: string[];
		nearpoint?: string[];
	} = {};

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		if (loading || success) return;

		resedentialError = {};

		const result = ResedentialSchema.safeParse(resedentialData);
		if (!result.success) {
			resedentialError = result.error.flatten().fieldErrors;

			for (const i of Object.keys(resedentialError)) {
				addErrorShake(i);
			}

			return;
		}

		dispatch('submit', resedentialData);
	};

	const handleSocialLogin = (e: CustomEvent<AvailableAuthProviders>) => {
		dispatch('login', e.detail);
	};
	export let error: string | undefined;
	export let success: string | undefined;

	const handleChange = (e: CustomEvent<ResedentialInputChangeEvent>) => {
		resedentialData[e.detail.name] = e.detail.value;
	};
</script>

<form class="w-full" on:submit={handleSubmit}>
	<div class="flex gap-0 lg:gap-3 w-full flex-col lg:flex-row">
		<FormInput
			loading={success ? true : loading}
			type="text"
			placeholder="India"
			name="country"
			label="Country"
			on:change={handleChange}
			value={resedentialData.country}
			errors={resedentialError?.country}
			required={false}
			showRequiredIndicator={true}
			id="country"
		/>
		<FormInput
			loading={success ? true : loading}
			type="text"
			placeholder="Delhi"
			name="state"
			label="State"
			align="end"
			on:change={handleChange}
			value={resedentialData.state}
			errors={resedentialError?.state}
			required={false}
			showRequiredIndicator={true}
			id="state"
		/>
	</div>

	<FormInput
		loading={success ? true : loading}
		type="text"
		placeholder="Address Line 1"
		name="address1"
		label="Address 1"
		align="end"
		on:change={handleChange}
		value={resedentialData.address1}
		errors={resedentialError?.address1}
		required={false}
		showRequiredIndicator={true}
		id="address1"
	/>
	<FormInput
		loading={success ? true : loading}
		type="text"
		placeholder="Address Line 2"
		name="address2"
		label="Address 2"
		align="end"
		on:change={handleChange}
		value={resedentialData.address2 || ''}
		errors={resedentialError?.address2}
		required={false}
		showRequiredIndicator={false}
		id="address2"
	/>
	<FormInput
		loading={success ? true : loading}
		type="text"
		placeholder="Some Supermarket"
		name="nearpoint"
		label="Nearpoint"
		align="end"
		on:change={handleChange}
		value={resedentialData.nearpoint || ''}
		errors={resedentialError?.nearpoint}
		required={false}
		showRequiredIndicator={false}
		id="nearpoint"
	/>

	<div class="w-full mt-8 flex flex-col gap-3">
		<button
			type="submit"
			class="shadow-lg btn btn-primary w-full {loading ? 'loading btn-disabled' : ''} {success
				? 'btn-disabled'
				: ''}"
			disabled={success ? true : loading}>Register</button
		>

		<FormAlert {error} {success} />
		<a class="btn w-full normal-case shadow-lg" href="/login">Already have an account?</a>
		<div class="divider text-sm prose">Or register with</div>
		<Socials on:login={handleSocialLogin} />
	</div>
</form>
