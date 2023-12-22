<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let cmdKey = 'Ctrl';
    onMount(() => {
        const isMac =
            (navigator as any).userAgentData?.platform?.toLowerCase() ===
                'macos' || navigator.platform?.toLowerCase().startsWith('mac');
        cmdKey = isMac ? '⌘' : 'Ctrl';

        document.addEventListener('keydown', (e) => {
            if (e.key === 'n' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                goto('/');
            }

            if (e.key === 'i' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                goto('/info');
            }
        });
    });
</script>

<div class="p-2 min-h-screen w-screen flex flex-col text-primary">
    <div>
        <div class="flex flex-row items-center gap-4">
            <h1 class="mr-auto text-2xl"><a href="/">YABin</a></h1>

            <!-- <a class="underline underline-offset-4 px-2 py-1" href="/dashboard/pastes">Pastes</a> -->
            <a
                class="underline underline-offset-4 px-2 py-1"
                href="/dashboard/settings">Settings</a
            >

            <button
                class="underline underline-offset-4 px-2 py-1"
                title="{cmdKey}+I"
                on:click={() => goto('/info')}
            >
                Info
            </button>

            <button
                class="bg-amber-500 text-black text-lg px-4 py-1"
                title="{cmdKey}+N"
                on:click={() => goto('/')}
            >
                New
            </button>
        </div>
    </div>

    <div class="px-24 py-4">
        <slot />
    </div>
</div>
