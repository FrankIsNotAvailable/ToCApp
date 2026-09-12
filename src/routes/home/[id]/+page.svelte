<script lang="ts">
    import DataEntryLayout from '$layouts/DataEntryLayout.svelte';
    import ActionDataCard from '$components/ActionDataCard.svelte';
    import Eye from '$lib/assets/eye.svg';
    import CloseEye from '$lib/assets/close-eye.svg';
    import Protect from '$lib/assets/protect.svg';
    import { useMaskingData } from '$hooks/useMaskingData';
    import { useRawData } from '$hooks/useRawData';
    import { page } from '$app/state';
    import { onMount } from 'svelte';

    const { fetchMaskingDataById, isLoading: isMaskingDataLoading } = useMaskingData();
    const { fetchRawDataById, isLoading: isRawdataLoading } = useRawData();

    const id = $derived(page.params.id);
    let isTextVisible = $state<boolean>(false);
    const eyeIcon = $derived(isTextVisible ? CloseEye : Eye);
    
    let errorMsg = $state<string | null>(null);
    let maskedText = $state<string | null>(null);
    let showData = $state<string | null>(null);

    function clearError() {
        errorMsg = null;
    }

    onMount(async () => {
        if (id) {
            clearError();
            try {
                const maskingData = await fetchMaskingDataById(id);
                if (!maskingData) {
                    errorMsg = 'Failed to load data';
                } else {
                    maskedText = maskingData.maskedData;
                    showData = maskedText;
                }
            } catch (err) {
                errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
            }
        }
    });

    async function handleToggleVisibility() {
        if (!id) return;
        clearError();

        try {
            if (!isTextVisible) {
                const rawData = await fetchRawDataById(id);
                if (!rawData) {
                    errorMsg = 'Failed to load raw data';
                    return;
                }
                showData = rawData.encData;
            } else {
                showData = maskedText;
            }

            isTextVisible = !isTextVisible;
        } catch (err) {
            errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
        }
    }
</script>

<DataEntryLayout isLoading={$isMaskingDataLoading || $isRawdataLoading} errorMessage={errorMsg}>
    {#if errorMsg}
        <div class="mb-4 flex items-center justify-between rounded-xl bg-red-100 border border-red-300 px-4 py-3 text-red-700">
            <span>{errorMsg}</span>
            <button 
                type="button" 
                onclick={clearError}
                class="ml-4 font-semibold hover:opacity-75 focus:outline-none"
                aria-label="Dismiss error"
            >
                ✕
            </button>
        </div>
    {/if}

    {#if showData !== null}
        <ActionDataCard
            bind:text={showData}
            width="w-full"
            header="Detailed Masked Data"
            headerImg={Protect}
            headerImgAlt="Shield icon"
            headerBgColor="bg-white"
            textAreaBgColor="bg-white"
            isReadOnly={true}
            textAreaPlaceholder=""
            topButton={true}
            topButtonImage={eyeIcon}
            topButtonAlt="toggle visibility"
            topButtonText=""
            onclickTopButton={handleToggleVisibility}
            actionButton={false}
        />
    {/if}
</DataEntryLayout>