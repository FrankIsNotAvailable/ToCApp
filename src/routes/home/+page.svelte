<script lang="ts">
	import DataList from '$components/DataList.svelte';
	import { useMaskingData } from '$hooks/useMaskingData';
    import { onMount } from 'svelte';
    import type { MaskingData } from '$appTypes/masking-data.type';
    import type { Meta } from '$appTypes/meta-data.type';
    import { goto } from '$app/navigation';

	const { fetchMaskingDataList } = useMaskingData();

    let items = $state<MaskingData[]>([]);
    let meta = $state<Meta | null>(null);
    let isLoading = $state(true);
    let error = $state<string | null>(null);

    let activePage = $state(1);

    let totalPages = $derived(meta?.lastPage ?? 1);
    let hasPrevPage = $derived(meta?.prevPage !== null && meta?.prevPage !== undefined);
    let hasNextPage = $derived(meta?.nextPage !== null && meta?.nextPage !== undefined);

    async function loadData(pageNumber = 1, forceRefresh = false) {
        isLoading = true;
        error = null;
        try {
            const response = await fetchMaskingDataList(pageNumber, 20, 'DESC', forceRefresh);
            if (response) {
                items = response.data || [];
                meta = response.meta || null;
                activePage = response.meta?.currentPage ?? pageNumber;
            }
        } catch (err) {
            error = err instanceof Error ? err.message : 'Failed to load data';
        } finally {
            isLoading = false;
        }
    }

    onMount(() => {
        loadData(activePage);
    });

    function goToPage(targetPage: number) {
        if (targetPage >= 1 && targetPage <= totalPages && targetPage !== activePage) {
            loadData(targetPage, true);
        }
    }

    function handleEdit(id: string) {
        goto(`/home/edit/${id}`);
    }

    function handleDelete(id: string) {
        items = items.filter((item) => item.id !== id);
        if (items.length === 0 && hasPrevPage && meta?.prevPage) {
            loadData(meta.prevPage, true);
        }
    }
</script>

<DataList 
    items={items}
    meta={meta}
    onEdit={handleEdit}
    onDelete={handleDelete}
    goToPage={goToPage}
    onError={loadData}
    isLoading={isLoading}
    error={error}
    activePage={activePage}
    totalPages={totalPages}
    hasPrevPage={hasPrevPage}
    hasNextPage={hasNextPage}
/>


