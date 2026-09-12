<script lang="ts">
	import removeImg from '$lib/assets/remove.svg';
	import successImg from '$lib/assets/success.png';

	let {
		open = false,
		//mock up itemlabel data 01
		itemLabel = 'Data 01',
		stage = 'confirm',
		onCancel,
		onConfirm,
		onClose
	}: {
		open?: boolean;
		itemLabel?: string;
		stage?: 'confirm' | 'processing' | 'success';
		onCancel?: () => void;
		onConfirm?: () => void;
		onClose?: () => void;
	} = $props();
</script>

{#if open}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-[15px]">
		{#if stage === 'processing'}
			<div
				class="flex w-full max-w-md flex-col items-center gap-4 rounded-3xl bg-white/70 px-10 py-12
				text-center shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
				<div
					class="flex h-16 w-16 items-center justify-center rounded-full bg-white
					shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)]">
					<div class="h-7 w-7 animate-spin rounded-full border-[3px] border-gray-200 border-t-gray-700"></div>
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-masked-data text-xl font-normal text-black">Deletion on process...</p>
					<p class="text-sm text-[#767676]">{itemLabel} is being deleted.</p>
				</div>
			</div>
		{:else if stage === 'success'}
			<div
				class="flex w-full max-w-md flex-col items-center gap-4 rounded-[1.5rem] bg-white/75 px-8 py-8
				text-center shadow-[0px_8px_32px_rgba(0,0,0,0.22)] backdrop-blur-xl">
				<div class="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)]">
					<img src={successImg} alt="success" class="h-14 w-14 object-contain" />
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-masked-data text-xl font-normal text-black">Deletion Succeeded</p>
					<p class="text-sm text-[#767676]">{itemLabel} was deleted successfully.</p>
				</div>

				<button
					type="button"
					class="mt-2 w-full rounded-full bg-[#4a4a4a] px-4 py-3 text-base font-semibold text-white
					hover:bg-[#333]"
					onclick={onClose ?? onCancel}
				>
					Done
				</button>
			</div>
		{:else}
			<div
				class="flex w-full max-w-md flex-col items-center gap-4 rounded-3xl bg-white/70 px-10 py-12
				text-center shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
				<div
					class="flex h-16 w-16 items-center justify-center rounded-full bg-white
					shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)]">
					<img src={removeImg} alt="" class="h-7 w-7 object-contain" />
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-masked-data text-xl font-normal text-black">Confirm Data Deletion?</p>
					<p class="text-sm text-[#767676]">
						Are you sure you want to delete this data?<br />
						This action cannot be undone.
					</p>
				</div>

				<div class="mt-2 flex w-full gap-3">
					<button
						type="button"
						class="flex-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black
						shadow-sm hover:bg-gray-50"
						onclick={onCancel}
					>
						Cancel
					</button>
					<button
						type="button"
						class="flex-1 rounded-full bg-[#4a4a4a] px-4 py-2 text-sm font-semibold text-white
						hover:bg-[#333]"
						onclick={onConfirm}
					>
						Delete
					</button>
				</div>
			</div>
		{/if}
	</div>
{/if}

