import type { Paste } from '@prisma/client';
import { HttpError, text } from '@sveltejs/kit';
import { getPaste } from '$lib/server/services';
import { decrypt, decryptWithPassword } from '$lib/crypto';

export async function GET({ url, params }) {
	const { key } = params;

	let data: Paste | undefined;

	try {
		data = await getPaste(key);
	} catch (e: any) {
		if (e?.constructor?.name === 'HttpError') {
			const httpError = e as HttpError;
			return text(httpError.body.message, { status: httpError.status });
		}
		console.error(e);
		return text('An error occurred', { status: 500 });
	}

	const { encrypted, passwordProtected, initVector } = data;
	let { content } = data;
	const searchParams = url.searchParams;
	const keyStr = searchParams.get('k');
	const password = searchParams.get('p');

	if (encrypted && initVector && keyStr && !passwordProtected) {
		try {
			content = await decrypt(content, initVector, decodeURIComponent(keyStr));
		} catch (e) {
			return text('Failed to decrypt', { status: 403 });
		}
	}

	if (encrypted && initVector && passwordProtected && password) {
		try {
			content = await decryptWithPassword(content, initVector, decodeURIComponent(password));
		} catch (e) {
			return text('Failed to decrypt', { status: 403 });
		}
	}

	return text(content);
}
