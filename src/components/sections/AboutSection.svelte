<script lang="ts">
	import KeyArt from '$lib/assets/key-art.webp';
	import LockArt from '$lib/assets/lock-art.webp';
	import Arrow from '$lib/assets/arrow.svg';

	interface Props {
		aboutSectionElement?: HTMLDivElement;
		progress?: number;
		arrowProgress?: number;
	}

	let { aboutSectionElement = $bindable(), progress = 0, arrowProgress = 0 }: Props = $props();
</script>

<div
	bind:this={aboutSectionElement}
	class="grid min-h-[calc(100vh-var(--navbar-height))] w-full grid-cols-1 gap-6 px-5 pt-4 pb-6 sm:px-8 lg:grid-cols-3 lg:grid-rows-3 lg:gap-0 lg:px-0 lg:py-4"
	id="about-us"
>
	<div class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:pl-[clamp(2rem,8vw,7rem)]">
		<div
			class="font-[family-name:var(--navbar-font)] text-[clamp(3.5rem,10vw,10rem)] leading-none"
			style={`transform: translateX(${progress * 100 - 100}%)`}
		>
			ABOUT US
		</div>
		<div
			class="mt-4 text-[1.25rem] leading-tight font-light sm:text-[1.5rem] lg:mt-0 lg:text-[2.5rem]"
		>
			"Precision masking, one regular expression at a time."
		</div>
	</div>

	<img
		src={KeyArt}
		alt="key art"
		class="mx-auto h-68 max-h-200 w-full max-w-lg object-contain p-6 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:h-full lg:max-w-none lg:p-12"
	/>

	<img
		src={LockArt}
		alt="lock art"
		class="mx-auto h-68 max-h-200 w-full max-w-lg object-contain p-6 lg:col-start-1 lg:row-span-2 lg:row-start-2 lg:h-full lg:max-w-none lg:p-12"
	/>

	<div
		class="my-auto flex w-full flex-col items-center gap-8 lg:col-span-2 lg:col-start-2 lg:row-start-3 lg:flex-row lg:gap-0"
	>
		<div class="flex flex-1 flex-col gap-4">
			<div class="text-center text-[2rem] leading-tight font-light sm:text-[2.5rem] lg:text-[4rem]">
				PDPA Data Masking Tool
			</div>
			<div
				class="mx-auto max-w-140 px-2 text-center text-sm leading-relaxed font-medium text-[#424752] sm:text-base"
			>
				Automatically detect and obscure sensitive Personal Data Protection Act (PDPA) information
				within raw text. Ensure compliance by securely masking credit cards, emails, phone numbers,
				dates of birth, and addresses using advanced regex patterns.
			</div>
		</div>

		<div
			class="flex h-[8rem] w-[8rem] shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/28 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)] sm:h-[9rem] sm:w-[9rem] lg:m-12 lg:mr-[clamp(2rem,10vw,10rem)] lg:h-[12rem] lg:w-[12rem]"
		>
			<img
				src={Arrow}
				alt="arrow"
				class="h-[4rem] w-[4rem] object-contain sm:h-[5rem] sm:w-[5rem] lg:h-[6rem] lg:w-[6rem]"
				style={`transform: rotate(${arrowProgress * 90}deg)`}
			/>
		</div>
	</div>
</div>
