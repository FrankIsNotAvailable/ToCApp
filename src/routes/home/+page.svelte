<script lang="ts">
	import DataList from '$components/DataList.svelte';
	import { useMaskingData } from '$hooks/useMaskingData';
	import { onMount } from 'svelte';
	import type { MaskingData } from '$appTypes/masking-data.type';
	import { goto } from '$app/navigation';

	const { fetchMaskingDataList, deleteMaskingData, store } = useMaskingData();

	const displayPageSize = 10;
	const backendBatchSize = 40;
	const pagesPerBatch = backendBatchSize / displayPageSize;

	let isLoading = $state(true);
	let error = $state<string | null>(null);
	let activeUiPage = $state(1);
	let loadedBackendPage = $state<number | null>(null);

	let storeData = $derived($store.data);
	let rawBatchItems = $derived<MaskingData[]>(storeData?.data ?? []);
	let backendMeta = $derived(storeData?.meta ?? null);

	let totalUiPages = $derived(
		backendMeta?.total ? Math.ceil(backendMeta.total / displayPageSize) : 1
	);
	let hasPrevUiPage = $derived(activeUiPage > 1);
	let hasNextUiPage = $derived(activeUiPage < totalUiPages);

	let displayedItems = $derived.by(() => {
		const relativePageIndex = (activeUiPage - 1) % pagesPerBatch;
		const start = relativePageIndex * displayPageSize;
		const end = start + displayPageSize;
		return rawBatchItems.slice(start, end);
	});

	async function loadDataForUiPage(targetUiPage: number, forceRefresh = false) {
		const requiredBackendPage = Math.ceil(targetUiPage / pagesPerBatch);

		if (loadedBackendPage !== requiredBackendPage || forceRefresh) {
			isLoading = true;
			error = null;
			try {
				const response = await fetchMaskingDataList(
					requiredBackendPage,
					backendBatchSize,
					'DESC',
					forceRefresh
				);

				if (response) {
					loadedBackendPage = requiredBackendPage;
				}
			} catch (err) {
				error = err instanceof Error ? err.message : 'Failed to load data';
				return;
			} finally {
				isLoading = false;
			}
		}

		activeUiPage = targetUiPage;
	}

	onMount(() => {
		loadDataForUiPage(1);
	});

	function goToPage(targetPage: number) {
		if (targetPage >= 1 && targetPage <= totalUiPages && targetPage !== activeUiPage) {
			loadDataForUiPage(targetPage);
		}
	}

	function handleEdit(id: string) {
		goto(`/home/data/${id}/edit`);
	}

	async function handleDelete(id: string) {
		const confirmed = confirm('Are you sure you want to delete this item?');
		if (!confirmed) return;

		try {
			await deleteMaskingData(id);

			const relativePageIndex = (activeUiPage - 1) % pagesPerBatch;
			const start = relativePageIndex * displayPageSize;
			const currentSlice = rawBatchItems.slice(start, start + displayPageSize);

			if (currentSlice.length === 0) {
				if (hasPrevUiPage) {
					goToPage(activeUiPage - 1);
				} else {
					await loadDataForUiPage(activeUiPage, true);
				}
			} else if (currentSlice.length < displayPageSize && activeUiPage < totalUiPages) {
				loadDataForUiPage(activeUiPage, true);
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to delete item';
		}
	}

	function handleError() {
		loadDataForUiPage(activeUiPage, true);
	}

	function handleClick(id: string) {
		goto(`/home/data/${id}`);
	}
</script>

<div class="flex flex-1 flex-col items-center justify-start">
	<div class="flex w-full max-w-5xl flex-1 flex-col px-4 py-4 sm:px-6 sm:py-8 md:px-8">
		<DataList
			items={displayedItems}
			onEdit={handleEdit}
			onDelete={handleDelete}
			onClick={handleClick}
			{goToPage}
			onError={handleError}
			{isLoading}
			{error}
			activePage={activeUiPage}
			totalPages={totalUiPages}
			hasPrevPage={hasPrevUiPage}
			hasNextPage={hasNextUiPage}
		/>
	</div>
</div>
