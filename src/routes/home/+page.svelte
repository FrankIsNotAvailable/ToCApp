<script lang="ts">
	import DataList from '$components/DataList.svelte';
	import { useMaskingData } from '$hooks/useMaskingData';
	import { onMount } from 'svelte';
	import type { MaskingData } from '$appTypes/masking-data.type';
	import type { Meta } from '$appTypes/meta-data.type';
	import { goto } from '$app/navigation';

	const { fetchMaskingDataList } = useMaskingData();

	const displayPageSize = 10; 
	const backendBatchSize = 40; 
	const pagesPerBatch = backendBatchSize / displayPageSize; 

	let rawBatchItems = $state<MaskingData[]>([]);
	let meta = $state<Meta | null>(null);
	let isLoading = $state(true);
	let error = $state<string | null>(null);

	let activeUiPage = $state(1);

	let loadedBackendPage = $state<number | null>(null);

	let totalUiPages = $derived(
		meta?.total ? Math.ceil(meta.total / displayPageSize) : 1
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
					rawBatchItems = response.data || [];
					meta = response.meta || null;
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
		goto(`/home/edit/${id}`);
	}

	function handleDelete(id: string) {
		rawBatchItems = rawBatchItems.filter((item) => item.id !== id);
		if (displayedItems.length === 0 && hasPrevUiPage) {
			goToPage(activeUiPage - 1);
		}
	}

    function handleError() {
        loadDataForUiPage(activeUiPage, true)
    }
</script>

<DataList
	items={displayedItems}
	meta={meta}
	onEdit={handleEdit}
	onDelete={handleDelete}
	goToPage={goToPage}
	onError={handleError}
	isLoading={isLoading}
	error={error}
	activePage={activeUiPage}
	totalPages={totalUiPages}
	hasPrevPage={hasPrevUiPage}
	hasNextPage={hasNextUiPage}
/>