import { getUserIdFromCookie } from '$lib/server/auth';

export async function load({ cookies }) {
	const userId = await getUserIdFromCookie(cookies);
	return { loggedIn: !!userId };
}
