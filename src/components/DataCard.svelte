<script lang="ts">
	import type { MaskingData } from '$appTypes/masking-data.type';
	import folderImg from '$lib/assets/folder.svg';
	import removeImg from '$lib/assets/remove.svg';
	import pen from '$lib/assets/pen.svg';

	let {
		data,
		onEdit,
		onDelete,
		height = 222,
		onClick
	}: {
		data: MaskingData;
		onEdit: (id: string) => void;
		onDelete: (id: string) => void;
		height?: number;
		onClick: (id: string) => void;
	} = $props();

	function formatDate(date: string) {
		const d = /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00`) : new Date(date);
		return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
	}

	function handleKeyDown(e: KeyboardEvent, id: string) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onClick(id);
		}
	}

	function handleDelete(e: MouseEvent) {
		e.stopPropagation();
		onDelete(data.id);
	}

	function handleEdit(e: MouseEvent) {
		e.stopPropagation();
		onEdit(data.id);
	}
</script>

<div
	class="relative flex w-full shrink-0 flex-col justify-between gap-4 overflow-hidden
    rounded-2xl bg-white/34 p-4 backdrop-blur-3xl transition-transform
    duration-200 ease-out hover:scale-[1.01] sm:flex-row sm:items-center sm:rounded-3xl
    sm:p-6 sm:hover:scale-[1.03]"
	style="min-height: {height}px;"
	onclick={() => onClick(data.id)}
	onkeydown={(e) => handleKeyDown(e, data.id)}
	role="button"
	tabindex="0"
>
	<div class="flex min-w-0 items-center gap-3 pr-0 sm:gap-4 sm:pr-24">
		<img
			src={folderImg}
			alt=""
			class="h-10 w-10 shrink-0 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16"
		/>

		<div class="h-10 w-px shrink-0 bg-black/25 sm:h-14 md:h-16"></div>

		<div class="flex min-w-0 flex-col gap-1">
			<p
				class="truncate font-masked-data text-lg leading-[1.2] font-normal text-black sm:text-2xl md:text-[28px]"
			>
				Data: {data.id}
			</p>
			<div class="flex flex-col">
				<p
					class="font-masked-data text-xs leading-[1.2] font-normal text-[#767676] sm:text-base md:text-[18px]"
				>
					created: {formatDate(data.createdAt)}
				</p>
				<p
					class="font-masked-data text-xs leading-[1.2] font-normal text-[#767676] sm:text-base md:text-[18px]"
				>
					edited: {data.updatedAt ? formatDate(data.updatedAt) : '-'}
				</p>
			</div>
		</div>
	</div>

	<div
		class="flex items-center justify-end gap-2.5 self-end sm:absolute sm:right-6 sm:bottom-4 sm:gap-3 sm:self-auto"
	>
		<button
			type="button"
			aria-label="delete"
			class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.34] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)] transition-colors
            hover:bg-white/50 sm:h-12 sm:w-12"
			onclick={handleDelete}
		>
			<img src={removeImg} alt="remove" class="h-5 w-5 object-contain sm:h-6 sm:w-6" />
		</button>
		<button
			type="button"
			aria-label="edit"
			class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.34] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)] transition-colors
            hover:bg-white/50 sm:h-12 sm:w-12"
			onclick={handleEdit}
		>
			<img src={pen} alt="edit" class="h-5 w-5 object-contain sm:h-6 sm:w-6" />
		</button>
	</div>
</div>
