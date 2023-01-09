import type { RegisterPayload } from '$lib/types';
import { availableAuthProviders, getDataForProvider } from '$lib/utils';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../login/$types';

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
	register: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as RegisterPayload;

		if (!formData.email || !formData.password || !formData.username) {
			return fail(400, {
				data: formData,
				error: 'Please specify all the fields correctly.'
			});
		}

		try {
			await locals.pb.collection('users').create({
				username: formData.username,
				password: formData.password,
				passwordConfirm: formData.password,
				email: formData.email
			});
			await locals.pb.collection('users').requestVerification(formData.email);
		} catch (err: any) {
			return fail(err.data.code, {
				error: err.data.message
			});
		}

		return {
			success: 'Verification email sent.'
		};
	}
};
