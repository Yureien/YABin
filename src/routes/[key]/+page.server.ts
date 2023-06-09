import { getPaste } from '$lib/server/services.js';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';
import sanitize from 'sanitize-html';

export async function load({ params }) {
	const { key } = params;

	const data = await getPaste(key);
	let { content, language, encrypted, passwordProtected, expiresCount, readCount } = data;

	let contentHtml: string;

	try {
		if (!encrypted && language !== 'plaintext') {
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
		contentHtml,
		encrypted,
		language,
		passwordProtected
	};
}
