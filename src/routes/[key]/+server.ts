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

	const { encrypted, passwordProtected } = data;
	let { content } = data;
	const searchParams = url.searchParams;
	const ivStr = searchParams.get('i');
	const keyStr = searchParams.get('k');
	const password = searchParams.get('p');

	if (encrypted && ivStr && keyStr && !passwordProtected) {
		try {
			content = await decrypt(content, decodeURIComponent(ivStr), decodeURIComponent(keyStr));
		} catch (e) {
			return text('Failed to decrypt', { status: 403 });
		}
	}

	if (encrypted && ivStr && passwordProtected && password) {
		try {
			content = await decryptWithPassword(
				content,
				decodeURIComponent(ivStr),
				decodeURIComponent(password)
			);
		} catch (e) {
			return text('Failed to decrypt', { status: 403 });
		}
	}

	return text(content);
}
