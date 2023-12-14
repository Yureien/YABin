import { getUserIdFromCookie } from '$lib/server/auth';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '@db';
import type { UserSettings } from '$lib/types';

export const load: PageServerLoad = async ({ cookies }) => {
    const userId = await getUserIdFromCookie(cookies);
    if (!userId) throw redirect(303, '/login');

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            settings: true,
            username: true,
            name: true,
            email: true
        },
    });

    return {
        settings: user?.settings as UserSettings,
        username: user?.username as string,
        name: user?.name as string,
        email: user?.email as string
    };
};

export const actions: Actions = {
    defaults: async ({ cookies, request }) => {
        const userId = await getUserIdFromCookie(cookies);
        if (!userId) throw redirect(303, '/login');

        const formData = await request.formData();
        const expiresAfterSeconds = parseInt(
            formData.get('expires-after-seconds')?.toString() ?? '0',
        );
        const data = {
            encrypted: formData.get('encrypted') === 'on',
            burnAfterRead: formData.get('burn-after-read') === 'on',
            expiresAfterSeconds: Math.max(
                0,
                Math.min(365 * 24 * 3600, expiresAfterSeconds),
            ),
        };

        const user = await prisma.user.update({
            where: { id: userId },
            data: { settings: { defaults: data } },
            select: { settings: true },
        });

        return {
            defaultsForm: {
                success: true,
                settings: user.settings as UserSettings,
            },
        };
    },
    changePassword: async ({ cookies, request }) => {
        
        return{
            passwordForm:{
                success: true
            }
        }
    }
};
