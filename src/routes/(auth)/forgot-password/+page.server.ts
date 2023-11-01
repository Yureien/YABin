import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import prisma from '@db';
import { nanoid } from 'nanoid';

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

		if (!user) {
			return fail(400, { success: false, errors: ['Username or e-mail not found'] });
		}

		await prisma.resetToken.upsert({
			where: {
				userId: user.id
			},
			update: {
				createdAt: new Date(),
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
				token: nanoid(32)
			},
			create: {
				user: {
					connect: {
						id: user.id
					}
				},
				createdAt: new Date(),
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
				token: nanoid(32)
			}
		});

		return { success: true, message: 'Please check e-mail for a password reset link' };
	}
};
