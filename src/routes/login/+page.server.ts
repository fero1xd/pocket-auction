import { availableAuthProviders, getDataForProvider, LoginSchema } from '$lib/utils';
import { fail } from '@sveltejs/kit';
import { ZodError } from 'zod';
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
		const formData = Object.fromEntries(await request.formData());
		let result;

		try {
			result = LoginSchema.parse(formData);
		} catch (e: unknown) {
			if (e instanceof ZodError) {
				const { fieldErrors } = e.flatten();
				return fail(400, {
					errors: fieldErrors
				});
			}

			return fail(400, {
				error: 'Please specify all the fields correctly.'
			});
		}

		try {
			await locals.pb.collection('users').authWithPassword(result.email, result.password);

			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return fail(400, {
					error: 'You must verify your email before you can login.'
				});
			}
		} catch (err: any) {
			return fail(err.data.code, {
				error: err.data.message || 'An unknown error occured.'
			});
		}

		return {
			success: true
		};
	}
};
