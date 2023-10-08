import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { validateVerificationHash } from '$lib/server/auth';

export const load: PageServerLoad = async ({ url }) => {
	const userId = url.searchParams.get('userId');
	const hash = url.searchParams.get('hash');

	if (!userId || !hash) {
		throw error(404, 'Not found');
	}

	const isValid = await validateVerificationHash(decodeURIComponent(userId), decodeURIComponent(hash));

	if (!isValid) {
		throw error(404, 'Not found');
	}

	throw redirect(303, '/login');
};
