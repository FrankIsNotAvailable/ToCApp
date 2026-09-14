<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { onDestroy } from 'svelte';

	export let isVisible = false;
	export let status: 'loading' | 'success' = 'loading';

	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	$: if (isVisible && status === 'success') {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			isVisible = false;
		}, 3000);
	}

	onDestroy(() => {
		if (timeoutId) clearTimeout(timeoutId);
	});

	$: if (!isVisible && timeoutId) {
		clearTimeout(timeoutId);
		timeoutId = undefined;
	}
</script>

{#if isVisible}
	<div
		class="fixed right-6 top-30 z-50 flex items-center rounded-xl border border-[#E5E4E0] bg-[#F0EFEA] px-6 py-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
		in:fly={{ x: 50, duration: 300 }}
		out:fade={{ duration: 180 }}
	>
		{#if status === 'loading'}
			<svg
				class="h-5 w-5 animate-spin text-gray-500"
				viewBox="0 0 24 24"
				aria-label="loading"
				role="status"
			>
				<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.5" fill="none" stroke-opacity="0.25" />
				<path
					d="M12 3a9 9 0 0 1 8.77 6.4"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					fill="none"
				/>
			</svg>
		{:else}
			<svg
				class="h-5 w-5"
				viewBox="0 0 24 24"
				fill="none"
				aria-label="success"
				role="img"
			>
				<circle cx="12" cy="12" r="8.5" stroke="black" stroke-width="1.8" />
				<path d="M8.5 12.3l2.4 2.4 4.6-5.3" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		{/if}

		<div class="mx-4 h-6 w-px bg-gray-300"></div>

		<p class="text-sm font-medium text-[#2F2F2F]">
			{status === 'loading' ? 'masking data' : 'done editing data'}
		</p>
	</div>
{/if}
