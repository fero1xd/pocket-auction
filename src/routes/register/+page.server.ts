import { availableAuthProviders, getDataForProvider } from '$lib/utils';
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
