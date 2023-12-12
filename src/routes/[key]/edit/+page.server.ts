import { getUserIdFromCookie } from '$lib/server/auth.js';
import { getPaste } from '$lib/server/services.js';
import prisma from '@db';

export async function load({ cookies, params }) {
    const { key } = params;

    const userId = await getUserIdFromCookie(cookies);
    const data = await getPaste(key);
    let { content, language, encrypted, passwordProtected, initVector } = data;

    return {
        content,
        encrypted,
        language,
        passwordProtected,
        initVector,
        isOwner: userId === data.ownerId,
    };
}
