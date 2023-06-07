import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '@db';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';

/** @type {PageServerLoad} */
export async function load({ params }) {
	const { key } = params;

	const data = await prisma.paste.findUnique({
		where: { key },
		select: { content: true }
	});

	if (!data) throw error(404, 'Not found');

	let { content } = data;

	// loadLanguages();
	const contentHtml = Prism.highlight(content, Prism.languages.html, 'html');

	return {
		contentHtml
	};
}
