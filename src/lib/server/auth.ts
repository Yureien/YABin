import { SALT } from '$env/static/private';
import { hashPassword } from '$lib/crypto';
import prisma from '@db';
import type { Cookies } from '@sveltejs/kit';

export const getUserIdFromCookie = async (cookies: Cookies) => {
	const token = cookies.get('token');
	if (!token) return null;

	const authToken = await prisma.authToken.findFirst({
		where: { token, expiresAt: { gt: new Date() } },
		include: { user: { select: { id: true, verified: true } } }
	});
	if (!authToken) return null;
	if (!authToken.user.verified) return null;

	return authToken.user.id;
};

export const generateVerificationHash = async (userId: string) => {
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) throw new Error('User not found');

	const hash = await hashPassword(`${user.email}${user.id}${user.password}${user.verified}`, SALT);
	return hash;
};

export const validateVerificationHash = async (userId: string, hash: string) => {
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) return false;

	const newHash = await hashPassword(
		`${user.email}${user.id}${user.password}${user.verified}`,
		SALT
	);
	if (newHash !== hash) return false;

	await prisma.user.update({ where: { id: userId }, data: { verified: true } });
	return true;
};
