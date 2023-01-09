import { redirect } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url, cookies }: RequestEvent) => {
	const redirectURL = `${url.origin}/auth/callback`;
	const expectedState = cookies.get('state');
	const providerName = cookies.get('provider');
	const codeVerifier = cookies.get('codeVerifier');

	const query = new URLSearchParams(url.search);
	const state = query.get('state');
	const code = query.get('code');

	const authMethods = await locals.pb?.collection('users').listAuthMethods();
	if (!authMethods?.authProviders) {
		console.log('no auth providers');
		throw redirect(303, '/login');
	}

	const provider = authMethods.authProviders?.find((p) => p.name === providerName);
	if (!provider) {
		console.log('Provider not found');
		throw redirect(303, '/login');
	}

	if (expectedState !== state) {
		console.log('state does not match expected', expectedState, state);
		throw redirect(303, '/login');
	}

	try {
		const result = await locals.pb
			?.collection('users')
			.authWithOAuth2(provider.name, code || '', codeVerifier || '', redirectURL);

		await locals.pb?.collection('users').update(result.record.id, {
			avatarUrl: result.meta?.avatarUrl
		});
	} catch (err) {
		console.log(err);
	}
	throw redirect(303, 'http://localhost:5173/');
};
