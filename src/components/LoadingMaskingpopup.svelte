<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import successImg from '$lib/assets/correct.png';

	type StatusType =
		| 'maskingText'
		| 'doneMaskingText'
		| 'maskingData'
		| 'doneMaskingData'
		| 'editingData'
		| 'doneEditingData';

	interface Props {
		isVisible?: boolean;
		status?: StatusType;
	}

	let { isVisible = $bindable(false), status = 'maskingText' }: Props = $props();

	const STATUS_TEXT: Record<StatusType, string> = {
		maskingText: 'masking text',
		doneMaskingText: 'done masking text',
		maskingData: 'masking data',
		doneMaskingData: 'done masking data',
		editingData: 'editing data',
		doneEditingData: 'done editing data'
	};

	let isSuccess = $derived(status.startsWith('done'));

	$effect(() => {
		if (isVisible && isSuccess) {
			const timer = setTimeout(() => {
				isVisible = false;
			}, 1000);

			return () => clearTimeout(timer);
		}
	});
</script>

{#if isVisible}
	<div
		class="fixed top-30 right-6 z-50 flex items-center rounded-xl border border-white/80 bg-[#FFFFFF]/40 px-6 py-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
		in:fly={{ x: 50, duration: 300 }}
		out:fade={{ duration: 180 }}
	>
		{#if !isSuccess}
			<svg
				class="h-7 w-7 animate-spin text-gray-500"
				viewBox="0 0 24 24"
				aria-label="loading"
				role="status"
			>
				<circle
					cx="12"
					cy="12"
					r="9"
					stroke="currentColor"
					stroke-width="2.5"
					fill="none"
					stroke-opacity="0.25"
				/>
				<path
					d="M12 3a9 9 0 0 1 8.77 6.4"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					fill="none"
				/>
			</svg>
		{:else}
			<img src={successImg} alt="success" class="h-7 w-7 object-contain" />
		{/if}

		<div class="mx-4 h-6 w-px bg-[#A1A1A1]"></div>
		<p class="font-[Inter] text-sm text-black">
			{STATUS_TEXT[status] ?? ''}
		</p>
	</div>
{/if}
