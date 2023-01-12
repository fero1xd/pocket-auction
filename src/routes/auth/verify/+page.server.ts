import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	if (locals.pb.authStore.isValid) throw redirect(303, '/');

	const params = new URLSearchParams(url.search);

	const token = params.get('token');
	if (!token) return redirect(303, '/');

	try {
		const res = await locals.pb?.collection('users').confirmVerification(token, undefined, {
			verified: false
		});

		if (res) {
			return {
				success: true
			};
		}

		return {
			error: 'There was a problem verifying your email'
		};
	} catch (e: any) {
		return {
			error: e.data.message
		};
	}
};
