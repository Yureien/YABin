import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    /* @migration task: add path argument */ cookies.delete('token');
    redirect(303, '/');
};

export const actions: Actions = {
    default({ cookies }) {
        cookies.delete('token');
        redirect(303, '/');
    },
};
