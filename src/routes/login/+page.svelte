<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionResult } from '@sveltejs/kit';
	import type { ActionData } from './$types';
	import NProgress from 'nprogress';
	import Socials from '$lib/socials.svelte';
	import type { ProviderData } from '$lib/types';
	import { browser } from '$app/environment';
	import FormInput from '$lib/formInput.svelte';
	import { addErrorShake } from '$lib/utils';

	export let form: ActionData;

	export let data: {
		providers?: ProviderData[];
	};
	const { providers } = data;

	let loading = false;

	const handleSubmit = (e: any) => {
		if (loading) return;
		loading = true;
		const formEl = e.form as HTMLFormElement;
		return async ({ result, update }: { result: ActionResult; update: any }) => {
			switch (result.type) {
				case 'success':
					await update();

					NProgress.start();
					setTimeout(() => {
						NProgress.done();
						goto('/', { replaceState: true });
					}, 3000);

					break;
				case 'failure':
					formEl.reset();
					await update();

					const errors = form?.errors;
					if (!errors) break;

					for (const id of Object.keys(errors)) {
						addErrorShake(id);
					}

					break;
				case 'error':
					await applyAction(result);
					break;
				default:
					await update();
			}

			loading = false;
		};
	};

	const handleSocialLogin = (e: CustomEvent<string>) => {
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
</script>

<div class="flex-1 w-full flex flex-col items-center justify-center">
	<h2 class="text-2xl lg:text-3xl mb-10 font-bold">Login To Your Account!</h2>

	<form
		action="?/login"
		method="POST"
		class="w-[400px] lg:w-[500px] px-6 lg:px-0"
		use:enhance={handleSubmit}
	>
		<FormInput
			loading={form?.success ? true : loading}
			label="Email"
			type="email"
			placeholder="example@domain.com"
			name="email"
			dispatchEvents={false}
			errors={form?.errors?.email}
			required={false}
			id="email"
		/>

		<FormInput
			loading={form?.success ? true : loading}
			label="Password"
			type="password"
			placeholder="*********"
			name="password"
			dispatchEvents={false}
			errors={form?.errors?.password}
			required={false}
			id="password"
		>
			<a href="/forgot-password" class="label-text-alt link link-hover">Forgot password?</a>
		</FormInput>

		<div class="w-full mt-8 flex flex-col gap-3">
			<button
				type="submit"
				class="shadow-lg btn btn-primary w-full {loading
					? 'loading btn-disabled'
					: ''} {form?.success ? 'btn-disabled' : ''}"
				disabled={loading || form?.success}>Login</button
			>
			{#if form?.error || form?.success}
				<div
					class="alert {form?.success
						? 'alert-success'
						: 'alert-error'} shadow-lg w-full max-w-lg mb-4"
				>
					<div>
						{#if form?.success}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="stroke-current flex-shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/></svg
							>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="stroke-current flex-shrink-0 h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
								/></svg
							>
						{/if}

						<span>
							{form?.success ? 'Logged in Successfully' : form?.error}
						</span>
					</div>
				</div>
			{/if}

			<a class="btn w-full normal-case shadow-lg" href="/register">Don't have an Account?</a>

			<div class="divider text-sm">Or login with</div>

			<Socials on:login={handleSocialLogin} />
		</div>
	</form>
</div>
