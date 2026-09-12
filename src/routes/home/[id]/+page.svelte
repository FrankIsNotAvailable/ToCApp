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

    onMount(async () => {
        if (id) {
            const maskingData = await fetchMaskingDataById(id);
            if (!maskingData) {
                errorMsg = 'Failed to load data';
            } else {
                maskedText = maskingData.maskedData;
                showData = maskedText;
            }
        }
    });

    async function handleToggleVisibility() {
        if (!id) return;

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
    }
</script>

<DataEntryLayout isLoading={$isMaskingDataLoading || $isRawdataLoading} errorMessage={errorMsg}>
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