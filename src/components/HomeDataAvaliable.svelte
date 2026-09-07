<script lang="ts">
    import { onMount } from 'svelte';
    import DataCard from './DataCard.svelte';
    import type { MaskingData } from '$appTypes/masking-data.type';
    import type { Meta } from '$appTypes/meta-data.type';
    import bgImage from '$lib/assets/mainbackground.png';
    import plus from '$lib/assets/plus.svg';
    import { useMaskingData } from '$hooks/useMaskingData';

    const { fetchMaskingDataList } = useMaskingData();

    const CARD_HEIGHT = 110;
    const PAGE_SIZE = 3;

    let navbarHeight = $state(0);
    let items = $state<MaskingData[]>([]);
    let meta = $state<Meta | null>(null);
    let isLoading = $state(true);
    let error = $state<string | null>(null);

    let activePage = $state(1);

    let totalPages = $derived(meta?.lastPage ?? 1);
    let hasPrevPage = $derived(meta?.prevPage !== null && meta?.prevPage !== undefined);
    let hasNextPage = $derived(meta?.nextPage !== null && meta?.nextPage !== undefined);

    function updateNavbarHeight() {
        const navbar = document.querySelector('.navBar');
        navbarHeight = navbar?.getBoundingClientRect().height ?? 0;
    }

    async function loadData(pageNumber = 1, forceRefresh = false) {
        isLoading = true;
        error = null;
        try {
            const response = await fetchMaskingDataList(pageNumber, PAGE_SIZE, 'DESC', forceRefresh);
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
        updateNavbarHeight();
        window.addEventListener('resize', updateNavbarHeight);
        loadData(1);

        return () => window.removeEventListener('resize', updateNavbarHeight);
    });

    function goToPage(targetPage: number) {
        if (targetPage >= 1 && targetPage <= totalPages && targetPage !== activePage) {
            loadData(targetPage, true);
        }
    }

    function handleEdit(id: string) {
        console.log('edit', id);
    }

    function handleDelete(id: string) {
        items = items.filter((item) => item.id !== id);
        if (items.length === 0 && hasPrevPage && meta?.prevPage) {
            loadData(meta.prevPage, true);
        }
    }
</script>

<div
    class="fixed inset-0 -z-30 bg-cover bg-center opacity-[44%] mix-blend-luminosity"
    style="background-image: url({bgImage});"
></div>
<div class="fixed inset-0 -z-20 backdrop-blur-[52px]"></div>

<div
    class="fixed inset-x-0 bottom-0 mx-auto flex w-full min-h-0 max-w-5xl flex-col gap-6 px-2 py-4"
    style="top: {navbarHeight}px;"
>
    <h1 class="font-masked-data shrink-0 text-center text-[40px] font-normal leading-[1.2] text-black">
        masked data
    </h1>

    {#if isLoading}
        <div class="flex flex-1 flex-col items-center justify-center gap-3">
            <p class="font-masked-data text-center text-[18px] text-[#767676]">Loading data...</p>
        </div>
    {:else if error}
        <div class="flex flex-1 flex-col items-center justify-center gap-3">
            <p class="font-masked-data text-center text-[18px] text-red-500">{error}</p>
            <button 
                type="button" 
                onclick={() => loadData(activePage, true)} 
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
            <p class="font-masked-data text-center text-[18px] leading-[1.4] font-normal text-[#767676]">
                no data available.<br />create one!
            </p>
        </div>
    {:else}
        <div class="flex flex-col gap-4">
            {#each items as item (item.id)}
                <DataCard data={item} onEdit={handleEdit} onDelete={handleDelete} height={CARD_HEIGHT} />
            {/each}
        </div>

        <div class="flex shrink-0 items-center justify-center gap-4 pt-2">
            <!-- Previous Button -->
            <button
                type="button"
                aria-label="previous page"
                class="rounded-full p-2 hover:bg-black/5 disabled:opacity-30"
                onclick={() => meta?.prevPage && goToPage(meta.prevPage)}
                disabled={!hasPrevPage}
            >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M15 6l-6 6 6 6" />
                </svg>
            </button>

            <!-- Page Indicators -->
            {#each Array(totalPages) as _, i}
                <button
                    type="button"
                    onclick={() => goToPage(i + 1)}
                    class="h-2.5 w-2.5 rounded-full transition-all {i + 1 === activePage ? 'bg-black scale-125' : 'bg-black/25'}"
                    aria-label="Go to page {i + 1}"
                ></button>
            {/each}

            <!-- Next Button -->
            <button
                type="button"
                aria-label="next page"
                class="rounded-full p-2 hover:bg-black/5 disabled:opacity-30"
                onclick={() => meta?.nextPage && goToPage(meta.nextPage)}
                disabled={!hasNextPage}
            >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 6l6 6-6 6" />
                </svg>
            </button>
        </div>
    {/if}
</div>

<a href="/create-data" aria-label="add masked data" class="fixed bottom-6 right-6 z-10">
    <img src={plus} alt="" class="h-14 w-14 object-contain" />
</a>