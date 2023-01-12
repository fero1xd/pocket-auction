import { CreateAccountSchema } from '$lib/utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (locals.pb.authStore.isValid) return json({ error: 'Bad Request' }, { status: 400 });

	const body = await request.json();

	const result = CreateAccountSchema.safeParse(body);

	if (!result.success) {
		return json(
			{
				errors: result.error.flatten().fieldErrors
			},
			{ status: 400 }
		);
	}

	try {
		const data = result.data;
		await locals.pb?.collection('users').create({
			...data,
			passwordConfirm: data.password,
			avatarUrl: `https://avatars.dicebear.com/api/identicon/${data.name}.svg`
		});

		await locals.pb.collection('users').requestVerification(data.email);
	} catch (e: any) {
		console.log(e);
		return json({ error: e.data.message }, { status: e.data.code });
	}

	return json({ success: 'Verification email sent.' });
};
