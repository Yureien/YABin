<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

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
	});

	function copyContent() {
		navigator.clipboard.writeText(data.content);
	}
</script>

<div class="pb-4">
	<div class="flex flex-row items-center gap-4">
		<h1 class="mr-auto text-2xl">YAbin</h1>

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
			on:click={() => goto('/new')}
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

<div class="whitespace-pre bg-dark p-4 line-numbers">
	{@html data.contentHtml}
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
