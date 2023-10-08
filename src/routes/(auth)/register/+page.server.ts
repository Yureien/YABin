import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '@db';
import { hashPassword } from '$lib/crypto';
import { nanoid } from 'nanoid';
import { MAIL_ENABLED, SALT } from '$env/static/private';
import { PUBLIC_REGISRATION_ENABLED } from '$env/static/public';
import { sendVerificationEmail } from '$lib/server/email/verify';

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		if (PUBLIC_REGISRATION_ENABLED !== 'true') {
			return fail(404, { success: false, errors: ['Not found'] });
		}

		const data = await request.formData();

		const name = data.get('name');
		const username = data.get('username');
		const email = data.get('email');
		const password = data.get('password');
		const cnfPassword = data.get('confirm-password');

		const errors: string[] = [];

		if (!name || !username || !email || !password || !cnfPassword) {
			errors.push('All fields are required');
		}

		if (email && !emailRegex.test(email?.toString())) {
			errors.push('Invalid email address');
		}

		if (password && password.toString().length < 8) {
			errors.push('Password must be at least 8 characters long');
		}

		if (password && password !== cnfPassword) {
			errors.push('Passwords do not match');
		}

		if (name && name.toString().length > 50) {
			errors.push('Name is too long');
		}

		if (username && username.toString().length > 50) {
			errors.push('Username is too long');
		}

		if (username && email) {
			const existingCount = await prisma.user.count({
				where: {
					OR: [{ username: username.toString() }, { email: email.toString() }]
				}
			});
			if (existingCount > 0) {
				errors.push('Username or email already exists');
			}
		}

		if (errors.length > 0) {
			return fail(400, { success: false, errors });
		}

		if (name && username && email && password) {
			const user = await prisma.user.create({
				data: {
					name: name.toString(),
					username: username.toString(),
					email: email.toString(),
					password: await hashPassword(password.toString(), SALT),
					verified: false
				}
			});

			if (MAIL_ENABLED === 'true') {
				const sentVerificationEmail = await sendVerificationEmail(user.id);
				if (sentVerificationEmail) {
					return { success: true, message: 'Please check your e-mail for verification link' };
				}
			}

			await prisma.user.update({ where: { id: user.id }, data: { verified: true } });

			const authToken = await prisma.authToken.create({
				data: {
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

			cookies.set('token', authToken.token, {
				path: '/',
				maxAge: 60 * 60 * 24 * 30, // 30 days
				secure: true,
				httpOnly: true,
				sameSite: 'strict'
			});

			throw redirect(303, '/');
		}

		return { success: false, errors: ['Unknown error'] };
	}
};
