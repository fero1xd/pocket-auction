import type { LoginPayload } from '$lib/types';
import { availableAuthProviders, getDataForProvider } from '$lib/utils';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const authMethods = await locals.pb.collection('users').listAuthMethods();

	if (!authMethods) {
		return {
			providers: []
		};
	}

	const providers = [];
	for (const provider of availableAuthProviders) {
		const data = getDataForProvider(authMethods, provider, url);
		if (data) providers.push(data);
	}

	return {
		providers
	};
};

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as LoginPayload;

		if (!formData.email || !formData.password) {
			return fail(400, {
				data: formData,
				error: 'Invalid Email or Password.'
			});
		}

		try {
			await locals.pb.collection('users').authWithPassword(formData.email, formData.password);

			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return fail(400, {
					error: 'You must verify your email before you can login.'
				});
			}
		} catch (err: any) {
			return fail(err.data.code, {
				error: err.data.message
			});
		}

		return {
			success: true
		};
	}
};
