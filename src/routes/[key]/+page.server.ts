import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '@db';
import { page } from '$app/stores';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';
import sanitize from 'sanitize-html';
import sodium from 'libsodium-wrappers';

/** @type {PageServerLoad} */
export async function load({ params, url }) {
	const { key } = params;

	const data = await prisma.paste.findUnique({
		where: { key }
	});

	if (!data) throw error(404, 'Not found');

	let { content, language, encrypted } = data;
	const nonceKeyB64 = url.searchParams.get('k');

	if (encrypted && nonceKeyB64) {
		await sodium.ready;
		try {
			if (!nonceKeyB64) throw new Error('Missing key');
			const [nonceB64, keyB64] = decodeURIComponent(nonceKeyB64).split(';');
			const nonce = sodium.from_base64(nonceB64);
			const key = sodium.from_base64(keyB64);
			const decrypted = sodium.crypto_secretbox_open_easy(sodium.from_base64(content), nonce, key);
			content = sodium.to_string(decrypted);
		} catch (e: any) {
			console.log(e);
			throw error(400, 'Invalid key');
		}
	}

	let contentHtml: string;

	try {
		if (language !== 'plaintext') {
			loadLanguages([language]);
			contentHtml = Prism.highlight(content, Prism.languages[language], language);
		} else {
			contentHtml = sanitize(content, { disallowedTagsMode: 'escape' });
		}
	} catch (e) {
		console.error(e);
		contentHtml = sanitize(content, { disallowedTagsMode: 'escape' });
	}

	return {
		content,
		contentHtml
	};
}
