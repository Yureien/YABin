<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { AutoLoader } from 'svelte-prism-autoloader';
	import type { PageData } from './$types';

	let Prism: any;

	export let data: PageData;
	let { content, contentHtml, language, encrypted } = data;
	let isSafe = true;
	let isDecrypted = false;
	let codeRef: HTMLElement;

	$: if (isDecrypted && codeRef) {
		(async () => {
			const Prism = (await import('prismjs')).default;
			Prism.highlightElement(codeRef);
		})();
	}

	let cmdKey = 'Ctrl';
	onMount(() => {
		const isMac =
			(navigator as any).userAgentData?.platform?.toLowerCase() === 'macos' ||
			navigator.platform?.toLowerCase().startsWith('mac');
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

			if (e.key === 'c' && e.altKey && e.shiftKey) {
				e.preventDefault();
				copyContent();
			}
		});

		if (encrypted) {
			contentHtml = 'Decrypting...';
			(async () => {
				const _sodium = (await import('libsodium-wrappers')).default;

				try {
					await _sodium.ready;
					const sodium = _sodium;

					const nonceKeyB64 = $page.url.searchParams.get('k');
					if (!nonceKeyB64) throw new Error('Missing key');
					const [nonceB64, keyB64] = decodeURIComponent(nonceKeyB64).split(';');
					const nonce = sodium.from_base64(nonceB64);
					const key = sodium.from_base64(keyB64);
					const decrypted = sodium.crypto_secretbox_open_easy(
						sodium.from_base64(content),
						nonce,
						key
					);
					content = sodium.to_string(decrypted);

					isSafe = false;
					isDecrypted = true;
				} catch (e) {
					console.error(e);
					contentHtml = 'Failed to decrypt';
				}
			})();
		}
	});

	function copyContent() {
		navigator.clipboard.writeText(content);
	}
</script>

<div class="pb-4">
	<div class="flex flex-row items-center gap-4">
		<h1 class="mr-auto text-2xl"><a href="/">YAbin</a></h1>

		<button
			class="btn underline underline-offset-4 px-2 py-1"
			title="{cmdKey}+I"
			on:click={() => goto('/info')}
		>
			Info
		</button>

		<button
			class="btn underline underline-offset-4 px-2 py-1"
			title="{cmdKey}+N"
			on:click={() => goto('/')}
		>
			New
		</button>

		<button
			class="btn bg-amber-500 text-black text-lg px-4 py-1"
			title="{cmdKey}+Shift+C"
			on:click={copyContent}
		>
			Copy
		</button>
	</div>
</div>

<div class="whitespace-pre bg-dark p-4 overflow-x-scroll">
	{#if isSafe}
		{@html contentHtml}
	{:else}
		<pre><code bind:this={codeRef} class="language-{language}">{content}</code></pre>
		<AutoLoader languagesPath="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/" />
	{/if}
</div>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css"
		integrity="sha512-vswe+cgvic/XBoF1OcM/TeJ2FW0OofqAVdCZiEYkd6dwGXthvkSFWOoGGJgS2CW70VK5dQM5Oh+7ne47s74VTg=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>

<style>
	pre {
		background-color: var(--color-dark) !important;
		padding: 0 !important;
		margin: 0 !important;
	}
</style>
