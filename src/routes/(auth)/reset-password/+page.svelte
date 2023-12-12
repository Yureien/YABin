<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<div class="flex flex-col justify-center items-center">
    <h1 class="text-4xl">Change Password</h1>
    <div class="mt-6">
        {#if form?.errors}
            <ul class="text-red-500 text-center">
                {#each form.errors as error}
                    <li>{error}</li>
                {/each}
            </ul>
        {/if}

        <form method="post" class="mt-2 flex flex-col gap-4" use:enhance>
            <div>
                <label for="new-password" class="px-2 py-2">New Password</label>
                <input
                    class="bg-dark px-2 py-1 w-full"
                    type="password"
                    id="new-password"
                    name="new-password"
                    placeholder="New Password"
                />
            </div>

            <div>
                <label for="confirm-password" class="px-2 py-2"
                    >Confirm Password</label
                >
                <input
                    class="bg-dark px-2 py-1 w-full"
                    type="password"
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm Password"
                />
            </div>

            <div class="flex flex-row items-center gap-4 mt-2">
                <button class="bg-amber-500 text-black text-lg px-4 py-1"
                    >Update Password</button
                >
            </div>
        </form>
    </div>
</div>
