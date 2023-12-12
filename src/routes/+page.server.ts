import { getUserIdFromCookie } from '$lib/server/auth';
import type { UserSettings } from '$lib/types';
import prisma from '@db';

export async function load({ cookies }) {
    const userId = await getUserIdFromCookie(cookies);

    let settings: UserSettings | undefined;

    if (userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { settings: true },
        });
        settings = user?.settings as UserSettings;
    }

    return { loggedIn: !!userId, settings };
}
