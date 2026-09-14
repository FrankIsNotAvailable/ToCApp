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
	class="overflow-hidden rounded-[1.25rem] border border-[#C5C5D3] {width}
            {headerBgColor}"
>
	<div class="flex items-center justify-between bg-[#ECEEF0] px-[1rem] py-[0.5rem]">
		<div class="flex items-center gap-[0.25rem] font-bold">
			<img src={headerImg} alt={headerImgAlt} class="h-[1.25rem] w-[1.25rem]" />
			{header}
		</div>

		{#if topButton}
			<button
				class="flex cursor-pointer items-center
                            gap-[0.25rem] text-[0.75rem] active:translate-y-[1px]"
				type="button"
				onclick={onclickTopButton}
			>
				{#if topButtonImage}
					<img src={topButtonImage} alt={topButtonAlt} class="h-4 w-4" />
				{/if}
				{topButtonText}
			</button>
		{/if}
	</div>

	<textarea
		class="h-56 w-full resize-none border-0 p-4
                    text-[0.875rem] font-medium text-[#333] outline-none
                    placeholder:text-[#9A9AA8] focus:ring-0 focus:outline-none
                    {textAreaBgColor}"
		bind:value={text}
		readonly={isReadOnly}
		placeholder={textAreaPlaceholder}></textarea>

	<div class="flex justify-end p-4">
		{#if actionButton}
			<button type="button" onclick={onclickActionButton}>
				<Button
					svg={actionButtonImage ?? ''}
					svgAlt={actionButtonAlt ?? ''}
					title={actionButtonTitle ?? ''}
					text={actionButtonTextColor ?? ''}
					border={actionButtonBorderColor ?? ''}
					background={actionButtonBackgroundColor ?? ''}
				/>
			</button>
		{/if}
	</div>
</div>
