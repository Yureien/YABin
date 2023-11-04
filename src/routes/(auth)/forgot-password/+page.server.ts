import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import prisma from '@db';
import { env } from '$env/dynamic/private';
import { sendResetEmail } from '$lib/server/email/reset-password';

export const load: PageServerLoad = async () => {
	if (env.MAIL_ENABLED === 'false') {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const usernameOrEmail = data.get('username-email');

		if (!usernameOrEmail) {
			return fail(400, { success: false, errors: ['All fields are required'] });
		}

		const user = await prisma.user.findFirst({
			where: {
				OR: [{ username: usernameOrEmail.toString() }, { email: usernameOrEmail.toString() }]
			}
		});

		if (env.MAIL_ENABLED === 'true' && user) {
			sendResetEmail(user.id);
		}

		// Success returned regardless of whether username/email is found or not
		return { success: true, message: 'Please check e-mail for a password reset link' };
	}
};
