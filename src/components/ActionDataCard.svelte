<script lang="ts">
	import Button from './Button.svelte';

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
</script>

<div
	class="w-full max-w-full overflow-hidden rounded-[1.25rem] border border-[#C5C5D3] {width}
            {headerBgColor}"
>
	<div
		class="flex flex-wrap items-center justify-between gap-2 bg-[#ECEEF0] px-3 py-2 sm:px-4 sm:py-2.5"
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
				class="flex shrink-0 cursor-pointer items-center
                        gap-1 text-xs transition-opacity hover:opacity-80 active:translate-y-[1px]"
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

	<textarea
		class="h-40 w-full resize-none border-0 p-3 text-xs font-medium
                text-[#333] outline-none placeholder:text-[#9A9AA8] focus:ring-0 focus:outline-none
                sm:h-56 sm:p-4 sm:text-sm
                {textAreaBgColor}"
		bind:value={text}
		readonly={isReadOnly}
		placeholder={textAreaPlaceholder}></textarea>

	{#if actionButton}
		<div class="flex justify-end p-3 sm:p-4">
			<button type="button" onclick={onclickActionButton} class="w-full sm:w-auto">
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
