import type { Auction } from '$lib/types';
import { getImageUrl } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const result = await locals.pb.collection('auctions').getList(1, 3);
	const items = result.items as Auction[];

	const modified = items.map((au) => {
		return {
			...au,
			item_images: [...au.item_images.map((im) => getImageUrl(au.collectionId, au.id, im))]
		};
	});

	return {
		isAuth: locals.user ? true : false,
		items: modified
	};
};
