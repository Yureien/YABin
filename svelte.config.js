import adapter from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/adapter-vercel').Config} */
export const adapterVercelConfig = {
    runtime: 'nodejs18.x',
    regions: ['sin1'],
    memory: 512,
};

const isVercel = process.env.VERCEL !== undefined; // Deploy to Vercel

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: isVercel ? adapterVercel(adapterVercelConfig) : adapter(),
        alias: {
            '@db': './src/lib/server/prisma/prisma.ts',
        },
    },
};

export default config;
