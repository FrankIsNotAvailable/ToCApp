<script lang="ts">
	import GlassyButton from './GlassyButton.svelte';
	import chevron from '$lib/assets/chevron.svg';

	let {
		onNextPage,
		onPrevPage,
		onSelectPage,
		totalPages,
		activePage,
		hasPrevPage,
		hasNextPage,
		showPageNumber = 2
	}: {
		onNextPage: () => void;
		onPrevPage: () => void;
		onSelectPage: (page: number) => void;
		activePage: number;
		totalPages: number;
		hasPrevPage: boolean;
		hasNextPage: boolean;
		showPageNumber?: number;
	} = $props();

	let innerWidth = $state(0);
	let effectiveDelta = $derived.by(() => {
		if (innerWidth < 640) return 1;
		if (innerWidth < 768) return 2;
		return showPageNumber;
	});

	let visiblePages = $derived.by(() => {
		if (totalPages <= 5) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const pages: (number | string)[] = [];
		const delta = effectiveDelta;
		const left = activePage - delta;
		const right = activePage + delta;

		for (let i = 1; i <= totalPages; i++) {
			if (i === 1 || i === totalPages || (i >= left && i <= right)) {
				pages.push(i);
			} else if (i === left - 1 || i === right + 1) {
				pages.push('...');
			}
		}

		return pages.filter((item, index, arr) => item !== '...' || arr[index - 1] !== '...');
	});
</script>

<svelte:window bind:innerWidth />

<div
	class="flex w-full shrink-0 items-center justify-between gap-2 px-2 pt-2 sm:justify-center sm:gap-4"
>
	<button
		type="button"
		aria-label="previous page"
		onclick={() => onPrevPage()}
		disabled={!hasPrevPage}
		class="touch-manipulation disabled:cursor-not-allowed disabled:opacity-50"
	>
		<GlassyButton>
			<img class="h-6 w-6 -scale-x-100 p-1 sm:h-5 sm:w-5" src={chevron} alt="chevron" />
		</GlassyButton>
	</button>

	<div class="flex items-center gap-1 sm:gap-1.5">
		{#each visiblePages as page}
			{#if typeof page === 'number'}
				<button
					type="button"
					onclick={() => onSelectPage(page)}
					class="flex h-8 w-8 touch-manipulation items-center justify-center rounded-full text-xs font-medium transition-all sm:h-6 sm:w-6 {page ===
					activePage
						? 'scale-[1.1] bg-[#484848] font-bold text-neutral-50 sm:scale-[1.2]'
						: 'bg-[#929292]/50 text-gray-900/70 hover:bg-black/20'}"
					aria-label="Go to page {page}"
				>
					{page}
				</button>
			{:else}
				<span class="px-0.5 text-xs font-bold text-black/40 select-none sm:px-1">...</span>
			{/if}
		{/each}
	</div>

	<button
		type="button"
		aria-label="next page"
		onclick={() => onNextPage()}
		disabled={!hasNextPage}
		class="touch-manipulation disabled:cursor-not-allowed disabled:opacity-50"
	>
		<GlassyButton>
			<img class="h-6 w-6 p-1 sm:h-5 sm:w-5" src={chevron} alt="chevron" />
		</GlassyButton>
	</button>
</div>
