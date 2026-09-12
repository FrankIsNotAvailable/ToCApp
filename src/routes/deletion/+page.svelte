<script lang="ts">
	import ConfirmDeletion from '$components/Deletion.svelte';

	let isPopupOpen = $state(false);
	let popupStage = $state<'confirm' | 'processing' | 'success'>('confirm');
	let selectedItem = $state('Data 01');

	function openPopup() {
		isPopupOpen = true;
		popupStage = 'confirm';
	}

	function closePopup() {
		isPopupOpen = false;
		popupStage = 'confirm';
	}

	function handleDeleteConfirm() {
		popupStage = 'processing';

		setTimeout(() => {
			popupStage = 'success';
		}, 1000);
	}

	function setStage(stage: 'confirm' | 'processing' | 'success') {
		popupStage = stage;
		isPopupOpen = true;
	}
</script>

<div class="min-h-screen bg-[#d9d9d9] px-4 py-8 text-black">
	<div class="mx-auto max-w-5xl">
		<div class="mb-8 flex items-center justify-between">
			<h1 class="font-masked-data text-[3rem] leading-none text-black">Masked Data</h1>
			<button
				type="button"
				class="rounded-full bg-[#4a4a4a] px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-[#333]"
				onclick={openPopup}
			>
				Open delete popup
			</button>
		</div>

		<div class="space-y-4 rounded-[1.5rem] border border-black/30 bg-white/20 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
			<div class="h-20 rounded-[1rem] bg-white/30"></div>
			<div class="h-20 rounded-[1rem] bg-white/30"></div>
			<div class="h-20 rounded-[1rem] bg-white/30"></div>
		</div>

		<div class="mt-6 flex flex-wrap gap-3">
			<button
				type="button"
				class="rounded-full border border-black/40 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
				onclick={() => setStage('confirm')}
			>
				Confirm
			</button>
			<button
				type="button"
				class="rounded-full border border-black/40 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
				onclick={() => setStage('processing')}
			>
				Processing
			</button>
			<button
				type="button"
				class="rounded-full border border-black/40 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
				onclick={() => setStage('success')}
			>
				Success
			</button>
		</div>
	</div>

	<ConfirmDeletion
		open={isPopupOpen}
		stage={popupStage}
		itemLabel={selectedItem}
		onCancel={closePopup}
		onConfirm={handleDeleteConfirm}
		onClose={closePopup}
	/>
</div>
