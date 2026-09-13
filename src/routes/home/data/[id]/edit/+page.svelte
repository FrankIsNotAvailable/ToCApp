<script lang="ts">
	import DataEntryLayout from '$layouts/DataEntryLayout.svelte';
	import ActionDataCard from '$components/ActionDataCard.svelte';
	import Note from '$lib/assets/input.svg';
	import Trash from '$lib/assets/remove.svg';
	import { goto } from '$app/navigation';
	import WhiteProtect from '$lib/assets/protectwhite.svg';
	import { page } from '$app/state';
	import { useRawData } from '$hooks/useRawData';
	import { onMount } from 'svelte';
	import { useMaskingData } from '$hooks/useMaskingData';

	const { updateMaskingDataById, isLoading: isMaskingDataLoading } = useMaskingData();
	const { fetchRawDataById, isLoading: isRawdataLoading, updateRawData } = useRawData();

	const id = $derived(page.params.id);

	let errorMsg = $state<string | null>(null);
	let rawText = $state<string | null>(null);

	function clearError() {
		errorMsg = null;
	}

	onMount(async () => {
		if (id) {
			clearError();
			try {
				const data = await fetchRawDataById(id);
				if (!data) {
					errorMsg = 'Failed to load data';
				} else {
					rawText = data.encData;
				}
			} catch (err) {
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

		if (rawText === null) {
			errorMsg = 'Invalid data or ID';
			return;
		}
		try {
			await updateMaskingDataById(id, { data: rawText });
            updateRawData(rawText);
            goto(`/home/data/${id}`);
		} catch (err) {
			errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred';
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
			actionButtonTitle="Update Mask Text"
			actionButtonImage={WhiteProtect}
			actionButtonAlt="Shield"
			actionButtonBackgroundColor="bg-black"
			actionButtonTextColor="text-white"
			actionButtonBorderColor="border-black cursor-pointer hover:border-gray-200"
			onclickActionButton={handleUpdateMaskingData}
		/>
	{/if}
</DataEntryLayout>
