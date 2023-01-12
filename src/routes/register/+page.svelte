<script lang="ts">
	import type {
		AvailableAuthProviders,
		ProviderData,
		RegisterPayload,
		ResedentialPayload
	} from '$lib/types';
	import CredentialsInput from '$lib/register/credentialsInput.svelte';
	import ResedentialInput from '$lib/register/resedentialInput.svelte';
	import { browser } from '$app/environment';
	import { CreateAccountSchema, CredentialsSchema } from '$lib/utils';
	import NProgress from 'nprogress';
	import { goto } from '$app/navigation';

	let success: string | undefined;
	let error: string | undefined;

	export let data: {
		providers?: ProviderData[];
	};

	const { providers } = data;

	let step = 1;
	let loading = false;
	let credentialsError: { name?: string[]; email?: string[]; password?: string[] };

	const handleSocialLogin = (e: CustomEvent<AvailableAuthProviders>) => {
		registerWithOauth(e.detail);
	};
	const registerWithOauth = (name: string) => {
		const _provider = providers?.find((p) => p.providerName === name);
		if (!_provider) return;

		if (browser) {
			document.cookie = `state=${_provider.authProviderState}`;
			document.cookie = `provider=${_provider.providerName}`;
			document.cookie = `codeVerifier=${_provider.providerCodeVerifier}`;
		}

		window.location.href = _provider.authProviderRedirect || '';
	};

	let credentialsData: RegisterPayload = { name: '', password: '', email: '' };
	let resedentialData: ResedentialPayload = {
		country: '',
		state: '',
		address1: ''
	};
	const handleCredentialsSubmit = (e: CustomEvent<RegisterPayload>) => {
		credentialsData = e.detail;
		console.log(credentialsData);

		step = 2;
	};
	const handleResedentialSubmit = async (e: CustomEvent<ResedentialPayload>) => {
		error = undefined;
		success = undefined;
		loading = true;

		resedentialData = e.detail;

		const result = CreateAccountSchema.safeParse({ ...credentialsData, ...resedentialData });
		if (!result.success) {
			error = 'Something went wrong.';
			return;
		}

		const data = result.data;

		try {
			const res = await fetch('/api/auth', {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const json = (await res.json()) as {
				success?: string;
				error?: string;
			};

			if (json.success) {
				error = undefined;
				success = json.success;
				NProgress.start();
				setTimeout(() => {
					NProgress.done();
					goto('/login', { replaceState: true });
				}, 3000);
			} else if (json.error) {
				success = undefined;
				error = json.error;
			}
		} catch (e: any) {
			error = 'Something unexpected happened';
		}

		loading = false;
	};

	const handleStep = (next: number) => {
		credentialsError = {};

		const result = CredentialsSchema.safeParse(credentialsData);
		if (!result.success) {
			credentialsError = result.error.flatten().fieldErrors;
			return;
		}

		step = next;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="flex-1 w-full flex flex-col items-center justify-center">
	<div class="mt-3 mb-5 lg:mb-8 flex gap-3 flex-col items-center justify-center w-full">
		<h2 class="text-2xl lg:text-3xl font-bold">Create A New Account!</h2>
		<ul class="steps">
			<li class="text-xs step step-primary cursor-pointer mr-7" on:click={() => (step = 1)} />
			<li
				class="text-xs {step < 2 ? 'opacity-50' : ''} step cursor-pointer {step >= 2
					? 'step-primary'
					: ''}"
				on:click={() => handleStep(2)}
			/>
		</ul>
	</div>

	<form action="?/register" method="POST" class="w-[400px] lg:w-[500px] px-6 lg:px-0 py-4 lg:py-0">
		{#if step === 1}
			<CredentialsInput
				{loading}
				{error}
				{success}
				{credentialsData}
				on:login={handleSocialLogin}
				on:submit={handleCredentialsSubmit}
				{credentialsError}
			/>
		{:else if step === 2}
			<ResedentialInput
				{loading}
				{error}
				{success}
				{resedentialData}
				on:login={handleSocialLogin}
				on:submit={handleResedentialSubmit}
			/>
		{/if}
	</form>
</div>
