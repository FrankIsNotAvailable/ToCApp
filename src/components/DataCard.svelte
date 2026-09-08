<script lang="ts">
	import type { MaskingData } from '$appTypes/masking-data.type';
	import folderImg from '$lib/assets/folder.svg';
	import removeImg from '$lib/assets/remove.svg';
	import pen from '$lib/assets/pen.svg';

	let {
		data,
		onEdit,
		onDelete,
		height = 222
	}: {
		data: MaskingData;
		onEdit: (id: string) => void;
		onDelete: (id: string) => void;
		height?: number;
	} = $props();

	function formatDate(date: string) {
		const d = /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00`) : new Date(date);
 		return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
	}
</script>

<div
	class="relative flex w-full shrink-0 items-center gap-4 overflow-hidden
	rounded-3xl bg-white/34 px-6 py-4
	transition-transform duration-200 ease-out hover:scale-[1.03] backdrop:blur-3xl"
	style="height: {height}px;"
>
	<div class="flex items-center gap-4">
		<img src={folderImg} alt="" class="h-16 w-16 shrink-0 object-contain" />
		<div class="h-16 w-px shrink-0 bg-black/25"></div>
		<div class="flex flex-col gap-1">
			<p class="font-masked-data text-[28px] leading-[1.2] font-normal text-black">
				Data: {data.id}
			</p>
			<div class="flex flex-col">
				<p class="font-masked-data text-[18px] leading-[1.2] font-normal text-[#767676]">
					created: {formatDate(data.createdAt)}
				</p>
				<p class="font-masked-data text-[18px] leading-[1.2] font-normal text-[#767676]">
					edited: {data.updatedAt ? formatDate(data.updatedAt) : '-'}
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
			onclick={() => onDelete(data.id)}
		>
			<img src={removeImg} alt="remove" class="h-6 w-6 object-contain" />
		</button>
		<button
			type="button"
			aria-label="edit"
			class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/[0.34]
			shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)] hover:bg-white/50"
			onclick={() => onEdit(data.id)}
		>
			<img src={pen} alt="edit" class="h-6 w-6 object-contain" />
		</button>
	</div>
</div>
