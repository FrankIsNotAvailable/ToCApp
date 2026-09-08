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

    let visiblePages = $derived.by(() => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | string)[] = [];
        const delta = showPageNumber;
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

<div class="flex shrink-0 items-center justify-center gap-4 pt-2">
	<button
		type="button"
		aria-label="previous page"
		onclick={() => onPrevPage()}
		disabled={!hasPrevPage}
	>
		<GlassyButton>
			<img class="h-5 w-5 -scale-x-100 p-1" src={chevron} alt="chevron" />
		</GlassyButton>
	</button>

	<div class="flex items-center gap-1.5">
        {#each visiblePages as page}
            {#if typeof page === 'number'}
                <button
                    type="button"
                    onclick={() => onSelectPage(page)}
                    class="flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-all {page === activePage
                        ? 'bg-[#484848] text-neutral-50 font-bold scale-120'
                        : 'bg-[#929292]/50 text-gray-900/70 hover:bg-black/20'}"
                    aria-label="Go to page {page}"
                >
                    {page}
                </button>
            {:else}
                <span class="px-1 text-xs font-bold text-black/40 select-none">...</span>
            {/if}
        {/each}
    </div>

	<button type="button" aria-label="next page" onclick={() => onNextPage()} disabled={!hasNextPage}>
		<GlassyButton>
			<img class="h-5 w-5 p-1" src={chevron} alt="chevron" />
		</GlassyButton>
	</button>
</div>
