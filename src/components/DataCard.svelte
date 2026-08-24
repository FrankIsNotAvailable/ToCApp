<script lang="ts">
	import type { MaskedData } from '$types/MaskedData';
	import folderImg from '$lib/assets/foderimg.png';
	import removeImg from '$lib/assets/remove.png';

	let {
		data,
		onEdit,
		onDelete,
		height = 222
	}: {
		data: MaskedData;
		onEdit?: (id: string) => void;
		onDelete?: (id: string) => void;
		height?: number;
	} = $props();

	function formatDate(date: Date) {
		return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
	}
</script>

<div
	class="dataCard relative flex w-full shrink-0 items-center gap-4 overflow-hidden
	rounded-[22px] bg-white/[0.34] px-6 py-4
	transition-transform duration-200 ease-out hover:scale-[1.03]"
	style="height: {height}px;"
>
	<div class="flex items-center gap-4">
		<img src={folderImg} alt="" class="h-16 w-16 shrink-0 object-contain" />
		<div class="h-16 w-px shrink-0 bg-black/25"></div>
		<div class="flex flex-col gap-1">
			<p class="font-masked-data text-[28px] leading-[1.2] font-normal text-black">
				Data: {data.fields.join(', ')}
			</p>
			<div class="flex flex-col">
				<p class="font-masked-data text-[18px] leading-[1.2] font-normal text-[#767676]">
					created: {formatDate(data.createdAt)}
				</p>
				<p class="font-masked-data text-[18px] leading-[1.2] font-normal text-[#767676]">
					edited: {data.editedAt ? formatDate(data.editedAt) : '-'}
				</p>
			</div>
		</div>
	</div>
	<div class="absolute bottom-4 right-6 flex items-center gap-3">
		<button
			type="button"
			aria-label="delete"
			class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/[0.34]
			shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)] hover:bg-white/50"
			onclick={() => onDelete?.(data.id)}
		>
			<img src={removeImg} alt="" class="h-6 w-6 object-contain" />
		</button>
		<button
			type="button"
			aria-label="edit"
			class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/[0.34]
			shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)] hover:bg-white/50"
			onclick={() => onEdit?.(data.id)}
		>
			<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
				<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
			</svg>
		</button>
	</div>
</div>
