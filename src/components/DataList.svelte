<script lang="ts">
	import DataCard from './DataCard.svelte';
	import plus from '$lib/assets/plus.svg';
	import type { MaskingData } from '$appTypes/masking-data.type';
	import type { Meta } from '$appTypes/meta-data.type';
	import Pagination from './Pagination.svelte';

	let {
		items,
		meta,
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
		meta: Meta | null;
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
		meta?.nextPage && goToPage(meta.nextPage);
	}

	function handlePrevPage() {
		meta?.prevPage && goToPage(meta.prevPage);
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
			<DataCard data={item} onEdit={onEdit} onDelete={onDelete} height={140} />
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

<a href="/create-data" aria-label="add masked data" class="fixed right-6 bottom-6 z-10">
	<img src={plus} alt="" class="h-14 w-14 object-contain" />
</a>
