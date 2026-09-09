<script lang="ts">
	import DataCard from './DataCard.svelte';
	import plus from '$lib/assets/plus.svg';
	import type { MaskingData } from '$appTypes/masking-data.type';
	import Pagination from './Pagination.svelte';
	import GlassyButton from './GlassyButton.svelte';

	let {
		items,
		onEdit,
		onDelete,
		goToPage,
		onError,
		isLoading,
		error,
		activePage,
		totalPages,
		hasPrevPage,
		hasNextPage
	}: {
		items: MaskingData[];
		isLoading: boolean;
		error: string | null;
		activePage: number;
		totalPages: number;
		hasPrevPage: boolean;
		hasNextPage: boolean;
		onEdit: (id: string) => void;
		onDelete: (id: string) => void;
		goToPage: (targetPage: number) => void;
		onError: () => void;
	} = $props();

	function handleNextPage() {
		goToPage(activePage + 1);
	}

	function handlePrevPage() {
		goToPage(activePage - 1);
	}
</script>

<h1
	class="my-10 shrink-0 text-center font-masked-data text-[40px] leading-[1.2] font-normal text-black"
>
	masked data
</h1>

{#if isLoading}
	<div class="flex flex-1 flex-col items-center justify-center gap-3">
		<p class="text-center font-masked-data text-[18px] text-[#767676]">Loading data...</p>
	</div>
{:else if error}
	<div class="flex flex-1 flex-col items-center justify-center gap-3">
		<p class="text-center font-masked-data text-[18px] text-red-500">{error}</p>
		<button
			type="button"
			onclick={() => onError()}
			class="rounded bg-black/10 px-4 py-2 text-sm font-medium hover:bg-black/20"
		>
			Retry
		</button>
	</div>
{:else if items.length === 0}
	<div class="flex flex-1 flex-col items-center justify-center gap-3">
		<a href="/create-data" aria-label="add masked_data">
			<img src={plus} alt="" class="h-10 w-10 object-contain" />
		</a>
		<p class="text-center font-masked-data text-[18px] leading-[1.4] font-normal text-[#767676]">
			no data available.<br />create one!
		</p>
	</div>
{:else}
	<div class="flex flex-col gap-4">
		{#each items as item (item.id)}
			<DataCard data={item} {onEdit} {onDelete} height={140} />
		{/each}
	</div>
	<div class="pt-2">
		<Pagination
			onNextPage={handleNextPage}
			onPrevPage={handlePrevPage}
			onSelectPage={goToPage}
			{totalPages}
			{activePage}
			{hasPrevPage}
			{hasNextPage}
		/>
	</div>
{/if}

<button class="fixed right-6 bottom-6 z-10 cursor-pointer">
	<GlassyButton>
		<a href="/create-data" aria-label="add masked data">
			<img src={plus} alt="" class="h-14 w-14 object-contain" />
		</a>
	</GlassyButton>
</button>
