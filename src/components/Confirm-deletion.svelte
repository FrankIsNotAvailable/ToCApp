<script lang="ts">
	import removeImg from '$lib/assets/remove.svg';

	let {
		open = false,
		onCancel,
		onConfirm
	}: {
		open?: boolean;
		onCancel: () => void;
		onConfirm: () => void;
	} = $props();
</script>

{#if open}
	<div class="fixed inset-0 flex items-center z-50 justify-center bg-black/40 p-4 backdrop-blur-sm">
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
	</div>
{/if}

