<script lang="ts">
	let {
		open = false,
		itemLabel = 'Data 01'
	}: {
		open?: boolean;
		itemLabel?: string;
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
				<div class="h-7 w-7 animate-spin rounded-full border-[3px] border-gray-200 border-t-gray-700"></div>
			</div>

			<div class="flex flex-col gap-1">
				<p class="font-masked-data text-xl font-normal text-black">Deletion on process...</p>
				<p class="text-sm text-[#767676]">{itemLabel} is being deleted.</p>
			</div>
		</div>
	</div>
{/if}
