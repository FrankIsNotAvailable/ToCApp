<script lang="ts">
	import DataCard from './cards/DataCard.svelte';
	import plus from '$lib/assets/plus.svg';
	import type { MaskingData } from '$appTypes/masking-data.type';
	import Pagination from './Pagination.svelte';
	import GlassyButton from './GlassyButton.svelte';
	import Spinner from './Spinner.svelte';

	let {
		items,
		onEdit,
		onDelete,
		goToPage,
		onError,
		onClick,
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
		onClick: (id: string) => void;
	} = $props();

	function handleNextPage() {
		goToPage(activePage + 1);
	}

	function handlePrevPage() {
		goToPage(activePage - 1);
	}
</script>

<div class="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 sm:px-6 lg:px-8">
	<h1
		class="my-6 shrink-0 text-center font-masked-data text-2xl leading-[1.2] font-normal text-black sm:my-8 sm:text-3xl md:my-10 md:text-[40px]"
	>
		masked data
	</h1>

	{#if isLoading}
		<div class="flex flex-1 flex-col items-center justify-center gap-3 py-12">
			<Spinner size="lg" label="Loading data..." />
		</div>
	{:else if error}
		<div class="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-12">
			<p class="text-center font-masked-data text-base text-red-500 sm:text-[18px]">{error}</p>
			<button
				type="button"
				onclick={() => onError()}
				class="rounded bg-black/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-black/20"
			>
				Retry
			</button>
		</div>
	{:else if items.length === 0}
		<div class="flex flex-1 flex-col items-center justify-center gap-3 py-12">
			<a
				href="/home/data/create"
				aria-label="add masked_data"
				class="transition-transform hover:scale-110"
			>
				<img src={plus} alt="" class="h-8 w-8 object-contain sm:h-10 sm:w-10" />
			</a>
			<p
				class="text-center font-masked-data text-base leading-[1.4] font-normal text-[#767676] sm:text-[18px]"
			>
				no data available.<br />create one!
			</p>
		</div>
	{:else}
		<div class="flex flex-col gap-3 sm:gap-4">
			{#each items as item (item.id)}
				<DataCard data={item} {onEdit} {onDelete} {onClick} height={140} />
			{/each}
		</div>

		<div class="pt-4 pb-20 sm:pb-24">
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
</div>

<a
	href="/home/data/create"
	aria-label="add masked data"
	class="fixed right-4 bottom-4 z-20 cursor-pointer transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
>
	<GlassyButton>
		<img src={plus} alt="" class="h-10 w-10 object-contain sm:h-14 sm:w-14" />
	</GlassyButton>
</a>
