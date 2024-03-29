import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import prisma from '@db';
import { hashPassword } from '$lib/crypto';
import { nanoid } from 'nanoid';
import { env } from '$env/dynamic/private';
import { getUserIdFromCookie } from '$lib/server/auth';

export const load: PageServerLoad = async ({ cookies }) => {
    const userId = await getUserIdFromCookie(cookies);
    if (userId) redirect(303, '/');
};
export const actions: Actions = {
    default: async ({ cookies, request }) => {
        const data = await request.formData();

        const usernameOrEmail = data.get('username-email');
        const password = data.get('password');

        if (!usernameOrEmail || !password) {
            return fail(400, {
                success: false,
                errors: ['All fields are required'],
            });
        }

        const hashedPassword = await hashPassword(
            password.toString(),
            env.SALT,
        );
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: usernameOrEmail.toString(),
                        password: hashedPassword,
                    },
                    {
                        email: usernameOrEmail.toString(),
                        password: hashedPassword,
                    },
                ],
            },
        });

        if (!user) {
            return fail(400, {
                success: false,
                errors: ['Invalid username or password'],
            });
        }

        if (!user.verified) {
            return fail(401, {
                success: false,
                errors: ['Account not verified'],
            });
        }

        await prisma.authToken.deleteMany({
            where: { expiresAt: { lte: new Date() } },
        });

        const authToken = await prisma.authToken.create({
            data: {
                user: { connect: { id: user.id } },
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
                token: nanoid(32),
            },
        });

        cookies.set('token', authToken.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            secure: true,
            httpOnly: true,
            sameSite: 'strict',
        });

        redirect(303, '/');
    },
};
