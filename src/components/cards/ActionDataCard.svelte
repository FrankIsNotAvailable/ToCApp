<script lang="ts">
	import Button from '../Button.svelte';

	interface Props {
		headerBgColor: string;
		width: string;
		headerImg: string;
		headerImgAlt: string;
		text: string;
		header: string;
		textAreaBgColor: string;
		isReadOnly: boolean;
		textAreaPlaceholder: string;
		topButton?: boolean;
		onclickTopButton?: () => void;
		topButtonImage?: string;
		topButtonAlt?: string;
		topButtonText?: string;
		actionButton?: boolean;
		onclickActionButton?: () => void;
		actionButtonImage?: string;
		actionButtonAlt?: string;
		actionButtonTitle?: string;
		actionButtonTextColor?: string;
		actionButtonBorderColor?: string;
		actionButtonBackgroundColor?: string;
	}

	let {
		text = $bindable(''),
		headerBgColor,
		width,
		headerImg,
		headerImgAlt,
		header,
		topButton,
		onclickTopButton,
		topButtonImage,
		topButtonAlt,
		topButtonText,
		textAreaBgColor,
		isReadOnly,
		textAreaPlaceholder,
		actionButton,
		onclickActionButton,
		actionButtonImage,
		actionButtonAlt,
		actionButtonTitle,
		actionButtonTextColor,
		actionButtonBorderColor,
		actionButtonBackgroundColor
	}: Props = $props();

	let activeTouchIndex = $state<number | null>(null);

	const typeColorMap: Record<string, { hover: string; text: string }> = {
		DOB: {
			hover: 'hover:decoration-purple-600 hover:text-purple-600',
			text: 'text-purple-600 decoration-purple-600'
		},
		EMAIL: {
			hover: 'hover:decoration-emerald-600 hover:text-emerald-600',
			text: 'text-emerald-600 decoration-emerald-600'
		},
		PHONE: {
			hover: 'hover:decoration-blue-600 hover:text-blue-600',
			text: 'text-blue-600 decoration-blue-600'
		},
		CARD: {
			hover: 'hover:decoration-amber-600 hover:text-amber-600',
			text: 'text-amber-600 decoration-amber-600'
		},
		ADDRESS: {
			hover: 'hover:decoration-rose-600 hover:text-rose-600',
			text: 'text-rose-600 decoration-rose-600'
		}
	};

	let chunks = $derived.by(() => {
		if (!text) return [];

		const tagRegex = /<([A-Z_]+)>(.*?)<\/\1>/g;
		const result = [];
		let lastIndex = 0;
		let match;

		while ((match = tagRegex.exec(text)) !== null) {
			if (match.index > lastIndex) {
				result.push({
					isEntity: false,
					value: text.slice(lastIndex, match.index),
					type: ''
				});
			}

			result.push({
				isEntity: true,
				value: match[2],
				type: match[1]
			});

			lastIndex = tagRegex.lastIndex;
		}

		if (lastIndex < text.length) {
			result.push({
				isEntity: false,
				value: text.slice(lastIndex),
				type: ''
			});
		}

		return result;
	});

	function toggleTouchTooltip(index: number) {
		if (activeTouchIndex === index) {
			activeTouchIndex = null;
		} else {
			activeTouchIndex = index;
		}
	}

	function handleActionButtonClick() {
		if (onclickActionButton) {
			onclickActionButton();
		}
	}
</script>

<div
	class="relative flex w-full max-w-full flex-col rounded-[1.25rem] border border-[#C5C5D3] {width} {headerBgColor}"
>
	<div
		class="flex flex-wrap items-center justify-between gap-2 rounded-t-[1.25rem] bg-[#ECEEF0] px-3 py-2.5 sm:px-4"
	>
		<div class="flex min-w-0 items-center gap-1.5 text-sm font-bold sm:text-base">
			<img
				src={headerImg}
				alt={headerImgAlt}
				class="h-4 w-4 shrink-0 object-contain sm:h-5 sm:w-5"
			/>
			<span class="truncate">{header}</span>
		</div>

		{#if topButton}
			<button
				class="flex shrink-0 cursor-pointer items-center gap-1 text-xs transition-opacity hover:opacity-80 active:translate-y-[1px]"
				type="button"
				onclick={onclickTopButton}
			>
				{#if topButtonImage}
					<img src={topButtonImage} alt={topButtonAlt} class="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
				{/if}
				<span>{topButtonText}</span>
			</button>
		{/if}
	</div>

	{#if isReadOnly}
		<div
			class="h-48 w-full overflow-y-auto p-6 text-xs font-medium wrap-break-word whitespace-pre-wrap text-[#333] sm:h-64 sm:text-sm {textAreaBgColor}"
		>
			{#if !text}
				<span class="text-[#9A9AA8]">{textAreaPlaceholder}</span>
			{:else}
				{#each chunks as chunk, index}
					{#if chunk.isEntity}
						<span
							class="group relative inline-block cursor-pointer text-[#191C1E]"
							role="button"
							tabindex="0"
							onclick={() => toggleTouchTooltip(index)}
							onkeydown={(e) => e.key === 'Enter' && toggleTouchTooltip(index)}
						>
							<span
								class="underline-offset-2 transition-colors duration-150 hover:underline {activeTouchIndex ===
								index
									? 'underline ' + typeColorMap[chunk.type]?.text
									: (typeColorMap[chunk.type]?.hover ?? 'hover:decoration-blue-600')}"
							>
								{chunk.value}
							</span><span
								class="pointer-events-none absolute bottom-full left-1/2 z-50 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-[10px] font-semibold whitespace-nowrap text-white shadow-lg transition-opacity group-hover:opacity-100 {activeTouchIndex ===
								index
									? 'opacity-100'
									: 'opacity-0'}">{chunk.type}</span
							>
						</span>
					{:else}
						<span>{chunk.value}</span>
					{/if}
				{/each}
			{/if}
		</div>
	{:else}
		<textarea
			class="h-48 w-full resize-none border-0 p-6 text-xs font-medium text-[#333] outline-none placeholder:text-[#9A9AA8] focus:ring-0 focus:outline-none sm:h-64 sm:text-sm {textAreaBgColor}"
			bind:value={text}
			placeholder={textAreaPlaceholder}></textarea>
	{/if}

	{#if actionButton}
		<div class="mt-auto flex justify-end rounded-b-[1.25rem] p-3 sm:p-4">
			<button type="button" onclick={handleActionButtonClick} class="w-full sm:w-auto">
				<Button
					svg={actionButtonImage ?? ''}
					svgAlt={actionButtonAlt ?? ''}
					title={actionButtonTitle ?? ''}
					text={actionButtonTextColor ?? ''}
					border={actionButtonBorderColor ?? ''}
					background={actionButtonBackgroundColor ?? ''}
				/>
			</button>
		</div>
	{/if}
</div>
