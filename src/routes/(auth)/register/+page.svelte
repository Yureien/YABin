<script lang="ts">
    import { enhance } from '$app/forms';
    import { env } from '$env/dynamic/public';
    import type { ActionData } from './$types';

    export let form: ActionData;
</script>

<div class="flex flex-col justify-center items-center">
    <h1 class="text-4xl">New User Registration</h1>
    <div class="mt-6">
        {#if form?.errors}
            <ul class="text-red-500 text-center">
                {#each form.errors as error}
                    <li>{error}</li>
                {/each}
            </ul>
        {/if}
        {#if form?.success}
            <div class="text-green-500 text-center">{form.message}</div>
        {/if}

        {#if env.PUBLIC_REGISTRATION_ENABLED == 'true'}
            <form method="post" class="mt-2 flex flex-col gap-4" use:enhance>
                <div>
                    <label for="username" class="px-2 py-2">Name</label>
                    <input
                        class="bg-dark px-2 py-1 w-full"
                        type="text"
                        name="name"
                        placeholder="Name"
                        minlength="1"
                        maxlength="50"
                    />
                </div>
                <div>
                    <label for="username" class="px-2 py-2">Username</label>
                    <input
                        class="bg-dark px-2 py-1 w-full"
                        type="text"
                        name="username"
                        placeholder="Username"
                        minlength="1"
                        maxlength="50"
                    />
                </div>
                <div>
                    <label for="username" class="px-2 py-2">E-mail</label>
                    <input
                        class="bg-dark px-2 py-1 w-full"
                        type="email"
                        name="email"
                        placeholder="E-mail"
                    />
                </div>
                <div>
                    <label for="username" class="px-2 py-2">Password</label>
                    <input
                        class="bg-dark px-2 py-1 w-full"
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                </div>
                <div>
                    <label for="username" class="px-2 py-2"
                        >Confirm Password</label
                    >
                    <input
                        class="bg-dark px-2 py-1 w-full"
                        type="password"
                        name="confirm-password"
                        placeholder="Confirm Password"
                    />
                </div>

                <div class="flex flex-row items-center gap-4 mt-2">
                    <span class="px-2 py-1">
                        Already have an account? <a
                            class="underline underline-offset-4"
                            href="/login">Login</a
                        >.
                    </span>

                    <button class="bg-amber-500 text-black text-lg px-4 py-1"
                        >Register</button
                    >
                </div>
            </form>
        {:else}
            <h1 class="text-2xl">Registration has been disabled.</h1>
        {/if}
    </div>
</div>
