<script lang="ts">
	import removeImg from '$lib/assets/remove.svg';
	import successImg from '$lib/assets/success.png';

	let {
		open = $bindable(false),
		itemLabel = 'Data 01',
		stage = $bindable('confirm'),
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
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[15px]">
		{#if stage === 'processing'}
			<div
				class="flex w-[448px] h-[330px] max-w-md flex-col items-center gap-5 
				rounded-3xl bg-white/65 px-10 py-22 border border-white/30
				text-center shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
				<div
					class="flex h-20 w-20 items-center justify-center rounded-full bg-white/40
					shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)]
					border border-white/50">
					<div class="h-11 w-11 animate-spin rounded-full border-[3px] border-gray-200 border-t-gray-700"></div>
				</div>

				<div class="flex flex-col gap-1">
					<p class="font-['Inter'] text-xl font-normal text-black">Deletion on process...</p>
					<p class="text-sm text-[#767676]">{itemLabel} is being deleted.</p>
				</div>
			</div>
		{:else if stage === 'success'}
			<div
				class="flex w-[448px] h-[330px] max-w-md flex-col items-center gap-5 
				rounded-3xl bg-white/65 px-10 py-10 border border-white/30
				text-center shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
				<div class="flex h-20 w-20 items-center justify-center rounded-full bg-white/40
					shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)]
					border border-white/50">
					<img src={successImg} alt="success" class="h-11 w-11 object-contain" />
				</div>
			<div class="flex flex-col gap-5 items-center">
				<div class="flex flex-col gap-5">
					<p class="font-['Inter'] text-xl font-normal text-black">Deletion Succeeded</p>
					<p class="text-sm font-normal text-[#868686]">{itemLabel} was deleted successfully.</p>
				</div>
				<div class="mt-2 flex w-35 h-12">
					<button
						type="button"
						class="flex-1 w-full backdrop-blur-md border border-white/10 bg-[rgba(50,50,50,0.82)] 
							shadow-[0px_4px_6px_rgba(0,0,0,0.25)] rounded-[7px]
							text-sm text-white hover:bg-[#333] font-['Inter']"
						onclick={onClose ?? onCancel}
					>
						Done
					</button>
				</div>
			</div>
			</div>
		{:else}
			<div
				class="flex w-[448px] h-[330px] max-w-md flex-col items-center gap-4 
				rounded-3xl bg-white/65 px-10 py-12 border border-white/30
				text-center shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
				<div
					class="flex h-20 w-20 items-center justify-center rounded-full bg-white/40
					border border-white/50
					shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)]">
					<img src={removeImg} alt="" class="h-10 w-10 object-contain" />
				</div>

				<div class="flex flex-col gap-1">
					<p class="text-xl font-normal font-['Inter'] text-black">Confirm Data Deletion?</p>
					<p class="text-sm text-[#767676] font-['Inter']">
						Are you sure you want to delete this data?<br />
						This action cannot be undone.
					</p>
				</div>

				<div class="mt-2 flex gap-6 w-60 h-10">
					<button
						type="button"
						class="flex-1 border border-white/50 bg-white/10
						shadow-[0px_4px_16px_rgba(0,0,0,0.25)] rounded-[7px] text-sm text-black
						hover:bg-white/30 font-['Inter']"
						onclick={onCancel}
					>
						Cancel
					</button>
					<button
						type="button"
						class="flex-1 backdrop-blur-md border border-white/10 bg-[rgba(50,50,50,0.82)] 
						shadow-[0px_4px_6px_rgba(0,0,0,0.25)] rounded-[7px]
						text-sm text-white hover:bg-[#333] font-['Inter']"
						onclick={onConfirm}
					>
						Delete
					</button>
				</div>
			</div>
		{/if}
	</div>
{/if}

