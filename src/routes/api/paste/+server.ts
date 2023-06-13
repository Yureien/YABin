import { json, type HttpError, type RequestHandler } from '@sveltejs/kit';
import type { Paste, PasteCreateResponse } from '$lib/types';
import prisma from '@db';
import { getPaste } from '$lib/server/services.js';

export const GET: RequestHandler = async ({ url }) => {
	const key = url.searchParams.get('key');
	if (!key) {
		return json({ success: false, error: 'No key provided' }, { status: 400 });
	}

	let paste;
	try {
		paste = await getPaste(key);
	} catch (e) {
		if (e?.constructor?.name === 'HttpError') {
			const httpError = e as HttpError;
			return json({ success: false, error: httpError.body.message }, { status: httpError.status });
		}
		return json({ success: false, error: 'An error occurred' }, { status: 500 });
	}

	if (!paste) {
		return json({ success: false, error: 'Paste not found' }, { status: 404 });
	}

	console.log(paste);

	const response: PasteCreateResponse = {
		success: true,
		data: paste
	};

	return json(response);
};

export const POST: RequestHandler = async ({ request }) => {
	const { content, config, passwordProtected, initVector }: Paste = await request.json();

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
			language: config?.language ?? 'plaintext',
			encrypted: config?.encrypted ?? false,
			passwordProtected,
			expiresCount: config?.burnAfterRead ? 2 : null,
			initVector,
			expiresAt: config?.expiresAfter ? new Date(Date.now() + config.expiresAfter * 1000) : null
		}
	});

	const response: PasteCreateResponse = {
		success: true,
		data: { key }
	};

	return json(response);
};

function randomString(length: number) {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
	let result = '';
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}
