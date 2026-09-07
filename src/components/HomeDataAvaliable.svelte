<script lang="ts">
	import { onMount } from 'svelte';
	import DataCard from './DataCard.svelte';
	import type { MaskedData } from '$types/MaskedData';
	import bgImage from '$lib/assets/mainbackground.png';
	import addButtonImg from '$lib/assets/addbuttondata.png';

	const CARD_HEIGHT = 110; // fixed for every card, regardless of item count
	const PAGE_SIZE = 3; // number of items per page

	let navbarHeight = $state(0);

	function updateNavbarHeight() {
		const navbar = document.querySelector('.navBar');
		navbarHeight = navbar?.getBoundingClientRect().height ?? 0;
	}

	onMount(() => {
		updateNavbarHeight();
		window.addEventListener('resize', updateNavbarHeight);
		return () => window.removeEventListener('resize', updateNavbarHeight);
	});

	let items: MaskedData[] = $state([
		{
			id: '1',
			fields: ['Credit Card Number', 'Address'],
			createdAt: new Date('2026-08-20'),
			editedAt: null
		},
		{
			id: '2',
			fields: ['Mail'],
			createdAt: new Date('2026-08-15'),
			editedAt: new Date('2026-08-19')
		},
		{
			id: '3',
			fields: ['Telephone', 'Address'],
			createdAt: new Date('2026-07-27'),
			editedAt: new Date('2026-08-08')
		}
	]);

	let page = $state(0);
	let totalPages = $derived(Math.max(1, Math.ceil(items.length / PAGE_SIZE)));
	let pageItems = $derived(items.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE));

	function prevPage() {
		page = Math.max(0, page - 1);
	}

	function nextPage() {
		page = Math.min(totalPages - 1, page + 1);
	}

	function handleEdit(id: string) {
		console.log('edit', id);
	}

	function handleDelete(id: string) {
		items = items.filter((item) => item.id !== id);
		if (page > totalPages - 1) page = totalPages - 1;
	}
</script>

<div
	class="fixed inset-0 -z-30 bg-cover bg-center opacity-[44%] mix-blend-luminosity"
	style="background-image: url({bgImage});"></div>
<div class="fixed inset-0 -z-20 backdrop-blur-[52px]"></div>

<div class="fixed inset-x-0 bottom-0 mx-auto flex w-full min-h-0 max-w-5xl flex-col gap-6 px-2 py-4" style="top: {navbarHeight}px;">
	<h1 class="font-masked-data shrink-0 text-center text-[40px] font-normal leading-[1.2] text-black">
        masked data
    </h1>
	{#if items.length === 0}
		<div class="flex flex-1 flex-col items-center justify-center gap-3">
			<a href="/create-data" aria-label="add masked_data">
				<img src={addButtonImg} alt="" class="h-10 w-10 object-contain" />
			</a>
			<p class="font-masked-data text-center text-[18px] leading-[1.4] font-normal text-[#767676]">
				no data available.<br />create one!
			</p>
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#each pageItems as item (item.id)}
				<DataCard data={item} onEdit={handleEdit} onDelete={handleDelete} height={CARD_HEIGHT} />
			{/each}
		</div>

		<div class="flex shrink-0 items-center justify-center gap-4 pt-2">
			<button
				type="button"
				aria-label="previous page"
				class="rounded-full p-2 hover:bg-black/5 disabled:opacity-30"
				onclick={prevPage}
				disabled={page === 0}>
				<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M15 6l-6 6 6 6" />
				</svg>
			</button>
			{#each Array(totalPages) as _, i}
				<span class="h-2.5 w-2.5 rounded-full {i === page ? 'bg-black' : 'bg-black/25'}"></span>
			{/each}
			<button
				type="button"
				aria-label="next page"
				class="rounded-full p-2 hover:bg-black/5 disabled:opacity-30"
				onclick={nextPage}
				disabled={page === totalPages - 1}
			>
				<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M9 6l6 6-6 6" />
				</svg>
			</button>
		</div>
	{/if}
</div>

<a href="/create-data" aria-label="add masked data" class="fixed bottom-6 right-6 z-10">
	<img src={addButtonImg} alt="" class="h-14 w-14 object-contain" />
</a>
