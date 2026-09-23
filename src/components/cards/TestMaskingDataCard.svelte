<script lang="ts">
	import ActionDataCard from './ActionDataCard.svelte';
	import Note from '$lib/assets/input.svg';
	import Trash from '$lib/assets/remove.svg';
	import Protect from '$lib/assets/protect.svg';
	import WhiteProtect from '$lib/assets/protectwhite.svg';
	import WhiteCopy from '$lib/assets/copywhite.svg';

	interface Props {
		rawText: string;
		maskedText: string;
		onCopy: () => void;
		onMask: () => void;
		onClear: () => void;
	}

	let { rawText = $bindable(''), maskedText, onCopy, onMask, onClear }: Props = $props();
</script>

<div class="flex w-full flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-8">
	<div class="w-full lg:w-1/2">
		<ActionDataCard
			bind:text={rawText}
			width="w-full"
			header="Raw Input Text"
			headerImg={Note}
			headerImgAlt="Note"
			headerBgColor="bg-white"
			textAreaBgColor="bg-white"
			isReadOnly={false}
			textAreaPlaceholder="012-345-6789 DOB:01/01/2559 john.doe@example.com..."
			topButton={true}
			topButtonImage={Trash}
			topButtonAlt="Trash"
			topButtonText="Clear"
			onclickTopButton={onClear}
			actionButton={true}
			actionButtonTitle="Mask Text"
			actionButtonImage={WhiteProtect}
			actionButtonAlt="Shield"
			actionButtonBackgroundColor="bg-black"
			actionButtonTextColor="text-white"
			actionButtonBorderColor="border-black cursor-pointer hover:border-gray-800 hover:bg-gray-900 active:scale-95 active:bg-gray-800 transition-all duration-150 touch-manipulation"
			onclickActionButton={onMask}
		/>
	</div>

	<div class="w-full lg:w-1/2">
		<ActionDataCard
			text={maskedText}
			width="w-full"
			header="Masked Output Text"
			headerImg={Protect}
			headerImgAlt="Shield"
			headerBgColor="bg-[#F7F9FB]"
			textAreaBgColor="bg-[#F7F9FB]"
			isReadOnly={true}
			textAreaPlaceholder=""
			actionButton={true}
			actionButtonTitle="Copy to Clipboard"
			actionButtonImage={WhiteCopy}
			actionButtonAlt="Copy"
			actionButtonBackgroundColor="bg-transparent"
			actionButtonTextColor="text-[#BABABA]"
			actionButtonBorderColor="border-gray-300 cursor-pointer hover:bg-gray-100 hover:text-gray-800 active:scale-95 active:bg-gray-200 transition-all duration-150 touch-manipulation"
			onclickActionButton={onCopy}
		/>
	</div>
</div>
