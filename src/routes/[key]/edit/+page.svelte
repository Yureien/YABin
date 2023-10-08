<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import type { PasteCreateResponse, PastePatch } from '$lib/types';
	import { encrypt, encryptWithPassword } from '$lib/crypto';

	export let data: PageData;
	let { isOwner, content, encrypted, passwordProtected, initVector } = data;
	let password = '';
	let isDecrypted = false;
	let pwInputRef: HTMLInputElement;
	let error: string;

	if (!isOwner) {
		error = 'You are not the owner of this paste';
	}

	let cmdKey = 'Ctrl';
	onMount(() => {
		const isMac =
			(navigator as any).userAgentData?.platform?.toLowerCase() === 'macos' ||
			navigator.platform?.toLowerCase().startsWith('mac');
		cmdKey = isMac ? '⌘' : 'Ctrl';

		pwInputRef?.focus();

		document.addEventListener('keydown', (e) => {
			if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				savePaste();
			}

			if (e.key === 'n' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				goto('/');
			}

			if (e.key === 'i' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				goto('/info');
			}

			if (encrypted && passwordProtected && !isDecrypted && e.key === 'Enter') {
				e.preventDefault();
				decryptPassword();
			}
		});

		if (encrypted && !passwordProtected) {
			(async () => {
				try {
					const keyStr = $page.url.hash.slice(1);
					if (!initVector || !keyStr) throw new Error('Missing key');

					const { decrypt } = await import('$lib/crypto');
					content = await decrypt(content, initVector, decodeURIComponent(keyStr));
				} catch (e) {
					error = 'Failed to decrypt';
				} finally {
					isDecrypted = true;
				}
			})();
		}
	});

	async function decryptPassword() {
		try {
			if (!initVector) throw new Error('Missing key');

			const { decryptWithPassword } = await import('$lib/crypto');
			content = await decryptWithPassword(content, initVector, password);
		} catch (e) {
			error = 'Failed to decrypt';
		} finally {
			isDecrypted = true;
		}
	}

	async function savePaste() {
		if (!content) return;

		let finalContent = content;
		let urlParams = '';
		let passwordProtected = false;
		let initVector: string | undefined;

		if (encrypted) {
			if (password) {
				passwordProtected = true;
				const { ciphertext, iv } = await encryptWithPassword(content, password);
				finalContent = ciphertext;
				initVector = iv;
			} else {
				const keyStr = $page.url.hash.slice(1);
				const { ciphertext, iv } = await encrypt(content, decodeURIComponent(keyStr));
				finalContent = ciphertext;
				initVector = iv;
				urlParams = `#${keyStr}`;
			}
		}

		const data: PastePatch = {
			key: $page.params.key,
			content: finalContent,
			encrypted,
			initVector
		};

		try {
			const response = await fetch('/api/paste', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const json: PasteCreateResponse = await response.json();
			if (json.success) {
				await goto(`/${json.data?.key}${urlParams}`);
			} else {
				console.log(json);
			}
		} catch (e) {
			console.log(e);
		}
	}
</script>

<div class="p-2 min-h-screen w-screen flex flex-col text-primary">
	<div class="pb-4">
		<div class="flex flex-row items-center gap-4">
			<h1 class="mr-auto text-2xl"><a href="/">YABin</a></h1>

			<button
				class="underline underline-offset-4 px-2 py-1"
				title="{cmdKey}+I"
				on:click={() => goto('/info')}
			>
				Info
			</button>

			<button
				class="underline underline-offset-4 px-2 py-1"
				title="{cmdKey}+N"
				on:click={() => goto('/')}
			>
				New
			</button>

			<button
				class="bg-amber-500 text-black text-lg px-4 py-1"
				title="{cmdKey}+S"
				on:click={savePaste}
			>
				Save
			</button>
		</div>
	</div>

	{#if error}
		<div class="md:mt-10 text-center text-lg">
			{error}
		</div>
	{:else if passwordProtected && !isDecrypted}
		<div class="flex flex-col items-center gap-4 md:mt-10">
			<input
				class="md:w-1/3 text-lg px-4 py-1 bg-dark text-white"
				type="text"
				placeholder="Enter password..."
				bind:this={pwInputRef}
				bind:value={password}
			/>
			<button class="md:w-fit bg-amber-500 text-black text-lg px-4 py-1" on:click={decryptPassword}>
				Decrypt
			</button>
		</div>
	{:else}
		<textarea
			class="px-2 grow border-none outline-none bg-transparent resize-none"
			spellcheck="false"
			bind:value={content}
		/>
	{/if}
</div>
