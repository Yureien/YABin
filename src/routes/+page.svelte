<script lang="ts">
	import { goto } from '$app/navigation';
	import { languageKeysByName } from '$lib/data';
	import type { Paste, PasteConfig, PasteCreateResponse } from '$lib/types';
	import { onMount } from 'svelte';
	import Select from 'svelte-select';

	let inputRef: HTMLTextAreaElement;
	let placeholderRef: HTMLDivElement;
	let cmdKey = 'Ctrl';
	let config: PasteConfig = {
		language: 'plaintext',
		encrypted: false,
		expiresAfter: 'never',
		burn: false,
		password: ''
	};

	onMount(() => {
		inputRef.focus();
		const isMac =
			(navigator as any).userAgentData?.platform?.toLowerCase() === 'macos' ||
			navigator.platform?.toLowerCase().startsWith('mac');
		cmdKey = isMac ? '⌘' : 'Ctrl';
		placeholderRef.classList.remove('hidden');

		document.addEventListener('keydown', (e) => {
			if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				save();
			}

			if (e.key === 'n' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				inputRef.value = '';
			}

			if (e.key === 'i' && (e.ctrlKey || e.metaKey)) {
				e.preventDefault();
				goto('/info');
			}
		});
	});

	const save = async () => {
		let content = inputRef.value;
		if (!content) return;

		const data: Paste = {
			content,
			config
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
				await goto(`/${json.data?.key}`);
			} else {
				console.log(json);
			}
		} catch (e) {
			console.log(e);
		}
	};
</script>

<div class="pb-4">
	<div class="flex flex-row items-center gap-4">
		<h1 class="mr-auto text-2xl">YAbin</h1>

		<div>
			<label for="burn" class="py-1">Burn after read?</label>
			<input id="burn" type="checkbox" bind:checked={config.burn} />
		</div>

		<div>
			<label for="expires-after" class="py-1">Expires after</label>
			<select id="expires-after" class="bg-dark px-1 py-1" bind:value={config.expiresAfter}>
				<option selected value="never">Never</option>
				<option value="1h">1 hour</option>
				<option value="1d">1 day</option>
				<option value="1w">1 week</option>
				<option value="1m">1 month</option>
				<option value="1y">1 year</option>
			</select>
		</div>

		<input
			type="text"
			class="bg-dark px-2 py-1"
			placeholder="Password"
			bind:value={config.password}
		/>

		<div>
			<label for="encrypted" class="py-1">Encrypted?</label>
			<input id="encrypted" type="checkbox" bind:checked={config.encrypted} />
		</div>

		<Select
			class="px-1 py-1"
			items={Array.from(languageKeysByName, ([label, value]) => ({ label, value }))}
			value={config.language}
			bind:justValue={config.language}
			showChevron
			clearable={false}
			--background="var(--color-dark)"
			--list-background="var(--color-dark)"
			--item-hover-bg="rgb(245, 158, 11)"
			--item-hover-color="#000"
			--border="0"
			--width="200px"
		/>

		<button
			class="btn underline underline-offset-4 py-1"
			title="{cmdKey}+N"
			on:click={() => goto('/')}
		>
			New
		</button>
		<button
			class="btn underline underline-offset-4 px-2 py-1"
			title="{cmdKey}+N"
			on:click={() => goto('/info')}
		>
			Info
		</button>
		<button
			class="btn bg-amber-500 text-black text-lg px-4 py-1"
			title="{cmdKey}+S"
			on:click={save}
		>
			Save
		</button>
	</div>
</div>

<div class="grow flex flex-col relative">
	<textarea
		class="px-2 grow border-none outline-none bg-transparent resize-none"
		spellcheck="false"
		bind:this={inputRef}
		on:keyup={() => {
			if (inputRef.value) {
				placeholderRef.classList.add('hidden');
			} else {
				placeholderRef.classList.remove('hidden');
			}
		}}
	/>
	<div
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-lg -z-10 opacity-40 hidden"
		bind:this={placeholderRef}
	>
		Type or paste anything here, and then {cmdKey}+S to save.
		<br /><br />
		Visit Info page to get the APIs and more.
		<br /><br />
		You can support this project and get a custom subdomain and custom styles (and text!) by going to
		the Info page.
	</div>
</div>
