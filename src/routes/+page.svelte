<script lang="ts">
	import { goto } from '$app/navigation';
	import { languageKeysByName } from '$lib/data';
	import type { Paste, PasteConfig, PasteCreateResponse } from '$lib/types';
	import { onMount } from 'svelte';
	import Select from 'svelte-select';
	import { encrypt, encryptWithPassword } from '$lib/crypto';
	import Hamburger from '$lib/components/Hamburger.svelte';

	const initialConfig: PasteConfig = {
		language: 'plaintext',
		encrypted: true,
		expiresAfter: 'never',
		burnAfterRead: false
	};

	let inputRef: HTMLTextAreaElement;
	let placeholderRef: HTMLDivElement;
	let cmdKey = 'Ctrl';
	let content: string = '';
	let password: string = '';
	let config: PasteConfig = { ...initialConfig };
	let sidebarOpen = false;

	let _sessionStorage: Storage | undefined;

	$: if (_sessionStorage) {
		const pasteData: { content: string; config: PasteConfig } = { content, config };
		_sessionStorage.setItem('contentBackup', JSON.stringify(pasteData));
	}

	onMount(() => {
		_sessionStorage = sessionStorage;
		const contentBackup = _sessionStorage.getItem('contentBackup');
		if (contentBackup) {
			const data: { content: string; config: PasteConfig } = JSON.parse(contentBackup);
			content = data.content;
			config = data.config;
		}

		inputRef.focus();
		const isMac =
			(navigator as any).userAgentData?.platform?.toLowerCase() === 'macos' ||
			navigator.platform?.toLowerCase().startsWith('mac');
		cmdKey = isMac ? '⌘' : 'Ctrl';

		document.addEventListener('keydown', (e) => {
			if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				save();
			}

			if (e.key === 'n' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				content = '';
				config = { ...initialConfig };
				sessionStorage.removeItem('contentBackup');
			}

			if (e.key === 'i' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				goto('/info');
			}
		});
	});

	const save = async () => {
		if (!content) return;

		let finalContent = content;
		let urlParams = '';
		let passwordProtected = false;

		if (config.encrypted) {
			if (password) {
				passwordProtected = true;
				const [encryptedContent, key] = await encryptWithPassword(content, password);
				finalContent = encryptedContent;
				urlParams = `k=${encodeURIComponent(key)}`;
			} else {
				const [encryptedContent, key] = await encrypt(content);
				finalContent = encryptedContent;
				urlParams = `k=${encodeURIComponent(key)}`;
			}
		}

		const data: Paste = {
			content: finalContent,
			config,
			passwordProtected
		};

		try {
			const response = await fetch('/api/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const json: PasteCreateResponse = await response.json();
			if (json.success) {
				_sessionStorage?.removeItem('contentBackup');
				await goto(`/${json.data?.key}?${urlParams}`);
			} else {
				console.log(json);
			}
		} catch (e) {
			console.log(e);
		}
	};
</script>

<div class="sm:hidden flex flex-row gap-2 items-center px-4 py-2">
	<h1 class="text-4xl mr-auto"><a href="/">YABin</a></h1>

	<button class="bg-amber-500 text-black text-lg px-4 py-1" on:click={save}>Save</button>

	<Hamburger bind:open={sidebarOpen} />
</div>

<div class="p-2 min-h-screen w-screen grid grid-cols-12 text-primary">
	<div class="col-span-12 sm:col-span-10 flex flex-col relative">
		<textarea
			class="px-2 grow border-none outline-none bg-transparent resize-none"
			spellcheck="false"
			bind:value={content}
			bind:this={inputRef}
		/>
		<div
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-lg -z-10 opacity-40 hidden"
			class:hidden={content}
			bind:this={placeholderRef}
		>
			Type or paste anything here, and then {cmdKey}+S to save.
			<br /><br />
			Visit Info page to get the APIs and more.
			<br /><br />
			You can support this project and get a custom subdomain and custom styles (and text!) by going
			to the Info page.
		</div>
	</div>
	<div
		class="sm:col-span-2 md:mt-4 px-2 max-sm:fixed max-sm:bg-black max-sm:bg-opacity-50 max-sm:backdrop-blur max-sm:h-full max-sm:w-full"
		class:expanded={sidebarOpen}
		id="sidebar"
	>
		<div class="flex flex-col items-center gap-4">
			<h1 class="text-4xl mb-5 max-sm:hidden"><a href="/">YABin</a></h1>

			<button
				class="bg-amber-500 text-black text-lg px-4 py-1 my-1 w-full max-sm:hidden"
				title="{cmdKey}+S"
				on:click={save}
			>
				Save
			</button>

			<div class="flex flex-row gap-4 mb-4 justify-center">
				<button
					class="underline underline-offset-4 py-1"
					title="{cmdKey}+N"
					on:click={() => goto('/')}
				>
					New
				</button>
				<button
					class="underline underline-offset-4 px-2 py-1"
					title="{cmdKey}+N"
					on:click={() => goto('/info')}
				>
					Info
				</button>
			</div>

			<Select
				class="px-1 py-1"
				items={Array.from(languageKeysByName, ([label, value]) => ({ label, value }))}
				value={config.language}
				bind:justValue={config.language}
				showChevron
				clearable={false}
				--background="var(--color-dark)"
				--list-background="#000"
				--item-hover-bg="rgb(245, 158, 11)"
				--item-hover-color="#000"
				--border="0"
			/>

			<div>
				<label for="encrypted" class="py-1">Encrypted?</label>
				<input id="encrypted" type="checkbox" bind:checked={config.encrypted} />
			</div>

			<input
				type="text"
				class="bg-dark px-2 py-1 w-full"
				placeholder="Password"
				disabled={!config.encrypted}
				bind:value={password}
			/>
			<small class="text-center text-xs hidden" class:hidden={config.encrypted}>
				Need to enable encryption to use a password
			</small>

			<div>
				<label for="burn" class="py-1">Burn after read?</label>
				<input id="burn" type="checkbox" bind:checked={config.burnAfterRead} />
			</div>

			<a class="underline underline-offset-4 px-2 py-1" href="https://github.com/Yureien/YABin">
				Source Code
			</a>
		</div>
	</div>
</div>

<style lang="postcss">
	#sidebar {
		right: -100%;
		transition: right 0.3s ease-out;

		&.expanded {
			right: 0;
		}
	}
</style>
