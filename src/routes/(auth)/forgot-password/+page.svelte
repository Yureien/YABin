<script lang="ts">
    import { enhance } from '$app/forms';
    import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<div class="flex flex-col justify-center items-center">
    <h1 class="text-4xl">Reset Password</h1>
    <div class="mt-6">
        {#if form?.errors}
            <ul class="text-red-500 text-center">
                {#each form.errors as error}
                    <li>{error}</li>
                {/each}
            </ul>
        {/if}
        {#if form?.success}
            <div class="text-green-500 text-center">{form?.message}</div>
        {/if}

        <form method="post" class="mt-2 flex flex-col gap-4" use:enhance>
            <div>
                <label for="username-email" class="px-2 py-2"
                    >Username or E-mail</label
                >
                <input
                    class="bg-dark px-2 py-1 w-full"
                    type="text"
                    id="username-email"
                    name="username-email"
                    placeholder="Username or E-mail"
                />
            </div>

            <div class="flex flex-row items-center gap-4 mt-2">
                <button class="bg-amber-500 text-black text-lg px-4 py-1"
                    >Reset Password</button
                >
            </div>
        </form>
    </div>
</div>
