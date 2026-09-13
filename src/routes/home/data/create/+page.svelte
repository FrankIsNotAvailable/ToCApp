<script lang="ts">
    import DataEntryLayout from '$layouts/DataEntryLayout.svelte';
    import ActionDataCard from '$components/ActionDataCard.svelte';
    import Note from '$lib/assets/input.svg';
    import Trash from '$lib/assets/remove.svg';
    import WhiteProtect from '$lib/assets/protectwhite.svg';
	import { goto } from '$app/navigation';
	import { useMaskingData } from '$hooks/useMaskingData';

	const { createMaskingData, isLoading: isMaskingDataLoading } = useMaskingData();

	let errorMsg = $state<string | null>(null);

	function clearError() {
		errorMsg = null;
	}

	function handleClearText() {
		rawText = '';
	}

    let rawText = $state<string>('');

	async function handleCreateData() {
		if (!rawText || rawText.trim() === '') {
			return;
		}
        clearError();
        try {
            const newMaskingData = await createMaskingData(rawText);
            if(!newMaskingData || !newMaskingData.data || !newMaskingData.data.id) {
                errorMsg = 'Failed to create masked data';
                return;
            }
            goto(`/home/data/${newMaskingData.data.id}`);
        } catch (err) {
            errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
        }
	}
</script>

<DataEntryLayout isLoading={$isMaskingDataLoading} errorMessage={errorMsg}>
    <ActionDataCard
        bind:text={rawText}
        width="w-full"
        header="Raw Input Text"
        headerImg={Note}
        headerImgAlt="Note"
        headerBgColor="bg-white"
        textAreaBgColor="bg-white"
        isReadOnly={false}
        textAreaPlaceholder="012-345-6789 DOB:01/01/2559 john.doe@example.com..."
        topButton={true}
        topButtonImage={Trash}
        topButtonAlt="Trash"
        topButtonText="Clear"
        onclickTopButton={handleClearText}
        actionButton={true}
        actionButtonTitle="Mask Text"
        actionButtonImage={WhiteProtect}
        actionButtonAlt="Shield"
        actionButtonBackgroundColor="bg-black"
        actionButtonTextColor="text-white"
        actionButtonBorderColor="border-black cursor-pointer hover:border-gray-200"
        onclickActionButton={handleCreateData}
    />
</DataEntryLayout>