<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

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
		});
	});
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
			class="btn bg-amber-500 text-black text-lg px-4 py-1"
			title="{cmdKey}+N"
			on:click={() => goto('/')}
		>
			New
		</button>
	</div>
</div>

<div class="grow flex flex-col relative">
	<slot />
</div>
