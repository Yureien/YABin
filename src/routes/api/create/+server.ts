import { json } from '@sveltejs/kit';
import type { Paste, PasteCreateResponse } from '$lib/types';
import prisma from '@db';

export async function POST({ request }) {
	const { content, config, passwordProtected }: Paste = await request.json();

	let attempts = 0;
	let keyLength = 5;
	let key = randomString(keyLength);
	while (await prisma.paste.findUnique({ where: { key } })) {
		key = randomString(keyLength);
		attempts++;
		if (attempts > 1) {
			keyLength++;
			attempts = 0;
		}
	}

	await prisma.paste.create({
		data: {
			key,
			content,
			language: config.language,
			encrypted: config.encrypted,
			passwordProtected,
			expiresCount: config.burnAfterRead ? 1 : null
		}
	});

	const response: PasteCreateResponse = {
		success: true,
		data: { key }
	};

	return json(response);
}

function randomString(length: number) {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
	let result = '';
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}
