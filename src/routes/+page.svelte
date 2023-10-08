<script lang="ts">
	import { goto } from '$app/navigation';
	import { languageKeysByName } from '$lib/data';
	import type { Paste, PasteConfig, PasteCreateResponse } from '$lib/types';
	import { onMount } from 'svelte';
	import Select from 'svelte-select';
	import { encrypt, encryptWithPassword } from '$lib/crypto';
	import Hamburger from '$lib/components/Hamburger.svelte';
	import { PUBLIC_REGISRATION_ENABLED } from '$env/static/public';
	import type { PageData } from './$types';

	export let data: PageData;

	const initialConfig: PasteConfig = {
		language: 'plaintext',
		encrypted: true,
		expiresAfter: 5,
		burnAfterRead: false
	};

	let expiresAfter: {
		days?: number;
		hours?: number;
		minutes?: number;
	} = {};

	$: {
		if (expiresAfter.days) {
			expiresAfter.days = Math.max(0, Math.round(expiresAfter.days));
		}
		if (expiresAfter.hours) {
			expiresAfter.hours = Math.max(0, Math.round(expiresAfter.hours));
			if (expiresAfter.hours > 23) {
				expiresAfter.days ??= 0;
				expiresAfter.days += Math.floor(expiresAfter.hours / 24);
				expiresAfter.hours = expiresAfter.hours % 24;
			}
		}
		if (expiresAfter.minutes) {
			expiresAfter.minutes = Math.max(0, Math.round(expiresAfter.minutes));
			if (expiresAfter.minutes > 59) {
				expiresAfter.days ??= 0;
				expiresAfter.hours ??= 0;
				expiresAfter.days += Math.floor(expiresAfter.minutes / 1440);
				expiresAfter.hours += Math.floor((expiresAfter.minutes % 1440) / 60);
				expiresAfter.minutes = expiresAfter.minutes % 60;
			}

			if (
				!expiresAfter.days &&
				!expiresAfter.hours &&
				expiresAfter.minutes > 0 &&
				expiresAfter.minutes < 5
			) {
				expiresAfter.minutes = 5;
			}
		}

		config.expiresAfter =
			((expiresAfter.days ?? 0) * 1440 +
				(expiresAfter.hours ?? 0) * 60 +
				(expiresAfter.minutes ?? 0)) *
			60;
	}

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
				newPaste(e);
			}

			if (e.key === 'i' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				goto('/info');
			}
		});
	});

	const newPaste = (e: any) => {
		e?.preventDefault();
		content = '';
		password = '';
		config = { ...initialConfig };
		sessionStorage.removeItem('contentBackup');
	};

	const save = async () => {
		if (!content) return;

		let finalContent = content;
		let urlParams = '';
		let passwordProtected = false;
		let initVector: string | undefined;

		if (config.encrypted) {
			if (password) {
				passwordProtected = true;
				const { ciphertext, iv } = await encryptWithPassword(content, password);
				finalContent = ciphertext;
				initVector = iv;
			} else {
				const { ciphertext, iv, key } = await encrypt(content);
				finalContent = ciphertext;
				initVector = iv;
				urlParams = `#${encodeURIComponent(key)}`;
			}
		}

		const data: Paste = {
			content: finalContent,
			config,
			passwordProtected,
			initVector
		};

		try {
			const response = await fetch('/api/paste', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			const json: PasteCreateResponse = await response.json();
			if (json.success) {
				_sessionStorage?.removeItem('contentBackup');
				await goto(`/${json.data?.key}${urlParams}`);
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

			<div class="flex flex-row gap-4 justify-center">
				<button class="underline underline-offset-4 py-1" title="{cmdKey}+N" on:click={newPaste}>
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

			{#if PUBLIC_REGISRATION_ENABLED == 'true'}
				<div class="flex flex-row gap-4 mb-4 justify-center">
					{#if data.loggedIn}
						<form action="/logout" method="post">
							<button class="underline underline-offset-4 py-1">Logout</button>
						</form>
					{:else}
						<a class="underline underline-offset-4 py-1" href="/login">Login</a>
						<a class="underline underline-offset-4 py-1" href="/register">Register</a>
					{/if}
				</div>
			{/if}

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
				autocomplete="new-password"
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

			<div class="w-full">
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
				</div>
			</div>

			<a class="underline underline-offset-4 px-2 py-1" href="https://github.com/Yureien/YABin">
				Source Code
			</a>

			<a
				class="underline underline-offset-4 px-2 py-1"
				href="https://github.com/Yureien/YABin/tree/main/cli"
			>
				CLI Client
			</a>

			<div class="flex flex-row gap-4 justify-center">
				<a
					class="github-button"
					href="https://github.com/sponsors/Yureien"
					data-color-scheme="no-preference: dark; light: light; dark: dark;"
					data-size="large"
					aria-label="Sponsor @Yureien on GitHub">Sponsor</a
				>
				<a
					class="github-button"
					href="https://github.com/Yureien/YABin"
					data-color-scheme="no-preference: dark; light: light; dark: dark;"
					data-size="large"
					data-show-count="true"
					aria-label="Star Yureien/YABin on GitHub">Star</a
				>
			</div>
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
