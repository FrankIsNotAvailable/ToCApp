<script lang="ts">
    import DataEntryLayout from '$layouts/DataEntryLayout.svelte';
    import ActionDataCard from '$components/ActionDataCard.svelte';
    import Eye from '$lib/assets/eye.svg';
    import CloseEye from '$lib/assets/close-eye.svg';
    import Protect from '$lib/assets/protect.svg';
    import { useMaskingData } from '$hooks/useMaskingData';
    import { page } from '$app/state';
    import { onMount } from 'svelte';
    import type { MaskingData } from '$appTypes/masking-data.type';

    const { fetchMaskingDataById, isLoading } = useMaskingData();

    const id = $derived(page.params.id);
    let maskingData = $state<MaskingData | null>(null);
    let isTextVisible = $state<boolean>(false);
    const eyeIcon = $derived(isTextVisible ? CloseEye : Eye);
    let errorMsg = $state<string | null>(null);

    onMount(async () => {
        if (id) {
            maskingData = await fetchMaskingDataById(id);
            if (!maskingData) errorMsg = 'Failed to load data';
        }
    });

    function handleToggleVisibility() {
        isTextVisible = !isTextVisible;
    }
</script>

<DataEntryLayout isLoading={$isLoading} errorMessage={errorMsg}>
    {#if maskingData}
        <ActionDataCard
            bind:text={maskingData.maskedData}
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