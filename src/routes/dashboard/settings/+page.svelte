<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import type { UserSettings } from '$lib/types';
    import { DHMToSeconds, secondsToDHM } from '$lib/utils/time';
    import type { ActionData, PageData } from './$types';

    export let data: PageData;
    export let form: ActionData;

    let expiresAfter: {
        days?: number;
        hours?: number;
        minutes?: number;
    } = {};
    let expiresAfterSeconds: number = 0;

    $: settings = form?.defaultsForm?.settings || data?.settings;

    const updateInitialConfig = (defaults: UserSettings['defaults']) => {
        if (!defaults) return;
        if (defaults?.expiresAfterSeconds) {
            expiresAfterSeconds = defaults.expiresAfterSeconds;
            expiresAfter = secondsToDHM(expiresAfterSeconds);
        }
    };
    $: updateInitialConfig(settings?.defaults);

    $: {
        expiresAfterSeconds = DHMToSeconds(expiresAfter);
        // Don't allow pastes to be saved for more than a year
        expiresAfterSeconds = Math.min(expiresAfterSeconds, 365 * 24 * 60 * 60);
        // Don't allow pastes to be saved for less than 5 minutes
        if (expiresAfterSeconds > 0) {
            expiresAfterSeconds = Math.max(expiresAfterSeconds, 5 * 60);
            expiresAfter = secondsToDHM(expiresAfterSeconds);
        } else {
            expiresAfter = {};
        }
    }
</script>

<h1 class="text-5xl">Settings</h1>

<div class="px-4">
    <div>
        <h4 class="text-2xl mt-6 mb-4">User</h4>
        <div class="grid grid-cols-3 px-4 py-1">
            <div>
                <div class="text-xl">Name</div>
                <div class="opacity-80">{data?.name}</div>
            </div>

            <div class="">
                <div class="text-xl">Username</div>
                <div class="opacity-80">{data?.username}</div>
            </div>
            <div>
                <div class="text-xl">Email</div>
                <div class="opacity-80">{data?.email}</div>
            </div>
        </div>
    </div>
    <div>
        <h4 class="text-2xl mt-6 mb-4">Change Password</h4>
        <div class="px-3">
            <form
                method="post"
                action="?/changePassword"
                use:enhance
                class="flex flex-col gap-7"
            >
                <div class="flex flex-col lg:w-[40%] w-[80%] gap-1">
                    <label for="newPassword">New Password:</label>
                    <input
                        type="newPassword"
                        name="newPassword"
                        class="bg-dark py-1 text-center"
                    />
                </div>
                <div class="flex flex-col lg:w-[40%] w-[80%] gap-1">
                    <label for="confirmPassword">Confirm Password:</label>
                    <input
                        type="confirmPassword"
                        name="confirmPassword"
                        class="bg-dark py-1 text-center"
                    />
                </div>
                <div class="">
                    <button class="bg-amber-500 text-black text-lg px-4 py-1"
                        >Save</button
                    >
                    {#if form?.passwordForm?.success}
                        <span class="text-green-500">Saved</span>
                    {/if}
                    {#if form?.passwordForm?.success === false}
                        <span class="text-red-800"
                            >{form.passwordForm?.error}</span
                        >
                    {/if}
                </div>
            </form>
        </div>
    </div>
    <div>
        <h4 class="text-2xl mt-6 mb-4">Defaults</h4>

        <form
            method="post"
            action="?/defaults"
            class="mt-2 flex flex-col gap-4 px-3"
            use:enhance={() => {
                return async ({ result }) => {
                    if (result.type === 'redirect') await goto(result.location);
                    else await applyAction(result);
                };
            }}
        >
            <div>
                <label for="encrypted" class="py-2">Encrypted</label>
                <input
                    id="encrypted"
                    class="bg-dark px-2 py-1"
                    type="checkbox"
                    name="encrypted"
                    checked={settings?.defaults?.encrypted}
                />
            </div>

            <div>
                <label for="burn-after-read" class="py-2">Burn after read</label
                >
                <input
                    id="burn-after-read"
                    class="bg-dark px-2 py-1"
                    type="checkbox"
                    name="burn-after-read"
                    checked={settings?.defaults?.burnAfterRead}
                />
            </div>

            <div>
                <span>Expires in:</span>
                <div class="grid grid-cols-3 gap-2 justify-center items-center">
                    <input
                        type="number"
                        class="bg-dark py-1 text-center"
                        placeholder="DD"
                        bind:value={expiresAfter.days}
                    />
                    <input
                        type="number"
                        class="bg-dark py-1 text-center"
                        placeholder="HH"
                        bind:value={expiresAfter.hours}
                    />
                    <input
                        type="number"
                        class="bg-dark py-1 text-center"
                        placeholder="MM"
                        bind:value={expiresAfter.minutes}
                    />
                    <input
                        type="hidden"
                        name="expires-after-seconds"
                        bind:value={expiresAfterSeconds}
                    />
                </div>
            </div>

            <div class="mt-2">
                <button class="bg-amber-500 text-black text-lg px-4 py-1"
                    >Save</button
                >
                {#if form?.defaultsForm !== undefined && form?.defaultsForm.success}
                    <span class="text-green-500">Saved</span>
                    <!-- {:else if form?.defaultsForm.error}
				<span class="text-red-500">Error</span> -->
                {/if}
            </div>
        </form>
    </div>
</div>
