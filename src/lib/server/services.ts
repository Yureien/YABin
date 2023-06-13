import { error } from '@sveltejs/kit';
import prisma from '@db';

export async function getPaste(key: string) {
	let data = await prisma.paste.findUnique({
		where: { key }
	});

	if (!data) throw error(404, 'Not found');

	data = await prisma.paste.update({
		where: { key },
		data: { readCount: { increment: 1 } }
	});

	const { expiresCount, readCount } = data;
	if (expiresCount !== null && expiresCount < readCount) {
		await prisma.paste.delete({ where: { key } });
		throw error(404, 'Not found');
	}

	return data;
}

export async function deleteExpiredPastes() {
	await prisma.paste.deleteMany({
		where: {
			expiresAt: {
				lt: new Date()
			}
		}
	});
}
