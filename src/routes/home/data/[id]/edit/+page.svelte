<script lang="ts">
	import DataEntryLayout from '$layouts/DataEntryLayout.svelte';
	import ActionDataCard from '$components/cards/ActionDataCard.svelte';
	import Note from '$lib/assets/input.svg';
	import Trash from '$lib/assets/remove.svg';
	import { goto } from '$app/navigation';
	import WhiteProtect from '$lib/assets/protectwhite.svg';
	import { page } from '$app/state';
	import { useRawData } from '$hooks/useRawData';
	import { onMount } from 'svelte';
	import { useMaskingData } from '$hooks/useMaskingData';
	import LoadingMaskingpopup from '$components/LoadingMaskingpopup.svelte';
	import { get } from 'svelte/store';

	type StatusType =
		| 'maskingText'
		| 'doneMaskingText'
		| 'maskingData'
		| 'doneMaskingData'
		| 'editingData'
		| 'doneEditingData';

	const {
		updateMaskingDataById,
		isLoading: isMaskingDataLoading,
		error: maskingError
	} = useMaskingData();
	const {
		fetchRawDataById,
		isLoading: isRawdataLoading,
		updateRawData,
		error: rawError
	} = useRawData();

	const id = $derived(page.params.id);

	let errorMsg = $state<string | null>(null);
	let rawText = $state<string | null>(null);

	let showPopup = $state<boolean>(false);
	let popupStatus = $state<StatusType>('editingData');

	function clearError() {
		errorMsg = null;
	}

	onMount(async () => {
		if (id) {
			clearError();
			try {
				const data = await fetchRawDataById(id);
				if (!data) {
					const storeError = get(rawError);
					errorMsg = storeError || 'Failed to load data';
				} else {
					rawText = data.encData;
				}
			} catch (err) {
				console.error('Error fetching raw data:', err);
				errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
			}
		}
	});

	function handleClearText() {
		rawText = '';
	}

	async function handleUpdateMaskingData() {
		if (!id) return;
		clearError();

		if (rawText === null || rawText.trim() === '') {
			errorMsg = 'Invalid data';
			return;
		}

		try {
			popupStatus = 'editingData';
			showPopup = true;

			const [updatedData] = await Promise.all([
				updateMaskingDataById(id, { data: rawText }),
				new Promise((resolve) => setTimeout(resolve, 500))
			]);

			if (!updatedData) {
				const storeError = get(maskingError);
				throw new Error(storeError || 'Failed to update masking data');
			}

			updateRawData(rawText);
			popupStatus = 'doneEditingData';

			setTimeout(() => {
				goto(`/home/data/${id}`);
			}, 500);
		} catch (err) {
			console.error('Error updating masking data:', err);
			errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
			showPopup = false;
		}
	}
</script>

<DataEntryLayout
	title="Edit Personal Information"
	isLoading={$isMaskingDataLoading || $isRawdataLoading}
	errorMessage={errorMsg}
>
	{#if rawText !== null}
		<ActionDataCard
			bind:text={rawText}
			width="w-full"
			header="Raw Input Text"
			headerImg={Note}
			headerImgAlt="Note"
			headerBgColor="bg-white"
			textAreaBgColor="bg-white"
			isReadOnly={false}
			textAreaPlaceholder=""
			topButton={true}
			topButtonImage={Trash}
			topButtonAlt="Trash"
			topButtonText="Clear"
			onclickTopButton={handleClearText}
			actionButton={true}
			actionButtonTitle="Update Text"
			actionButtonImage={WhiteProtect}
			actionButtonAlt="Shield"
			actionButtonBackgroundColor="bg-black"
			actionButtonTextColor="text-white"
			actionButtonBorderColor="border-black cursor-pointer hover:border-gray-800 hover:bg-gray-900 active:scale-95 active:bg-gray-800 transition-all duration-150 touch-manipulation"
			onclickActionButton={handleUpdateMaskingData}
		/>
	{/if}
</DataEntryLayout>
<LoadingMaskingpopup bind:isVisible={showPopup} status={popupStatus} />
