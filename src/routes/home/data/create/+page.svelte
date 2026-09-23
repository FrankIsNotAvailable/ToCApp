<script lang="ts">
	import DataEntryLayout from '$layouts/DataEntryLayout.svelte';
	import ActionDataCard from '$components/cards/ActionDataCard.svelte';
	import Note from '$lib/assets/input.svg';
	import Trash from '$lib/assets/remove.svg';
	import WhiteProtect from '$lib/assets/protectwhite.svg';
	import { goto } from '$app/navigation';
	import { useMaskingData } from '$hooks/useMaskingData';
	import LoadingMaskingpopup from '$components/LoadingMaskingpopup.svelte';

	const { createMaskingData, isLoading: isMaskingDataLoading } = useMaskingData();

	let errorMsg = $state<string | null>(null);

	function clearError() {
		errorMsg = null;
	}

	function handleClearText() {
		rawText = '';
	}

	let rawText = $state<string>('');
	let showPopup = $state<boolean>(false);
    let popupStatus = $state<'masking_data' | 'done_masking_data'>('masking_data');

	async function handleCreateData() {
		if (!rawText || rawText.trim() === '') {
			return;
		}
		clearError();
		try {
			popupStatus = 'masking_data';
			showPopup = true;
			const newMaskingData = await createMaskingData(rawText);
			if (!newMaskingData || !newMaskingData.data || !newMaskingData.data.id) {
				errorMsg = 'Failed to create masked data';
				showPopup = false;
				return;
			}
			popupStatus = 'done_masking_data';
			setTimeout(() => {
                goto(`/home/data/${newMaskingData.data.id}`);
            }, 1500);
		} catch (err) {
			errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
			showPopup = false;
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
		actionButtonBorderColor="border-black cursor-pointer hover:border-gray-800 hover:bg-gray-900 active:scale-95 active:bg-gray-800 transition-all duration-150 touch-manipulation"
		onclickActionButton={handleCreateData}
	/>
</DataEntryLayout>
<LoadingMaskingpopup bind:isVisible={showPopup} status={popupStatus} />
