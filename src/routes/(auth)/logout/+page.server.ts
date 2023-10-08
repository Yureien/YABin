import { redirect, type Actions, type RequestHandler } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	cookies.delete('token');
	throw redirect(303, '/');
};

export const actions: Actions = {
	default({ cookies }) {
		cookies.delete('token');
		throw redirect(303, '/');
	}
};
