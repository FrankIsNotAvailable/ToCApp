<script>
	export let picture = '';
	export let pictureAlt = '';
	export let title = '';
	export let description = '';
	export let pattern = '';
</script>

<div
	class="flex h-full w-full flex-col items-center justify-between
            overflow-y-auto
            rounded-[17px] p-6 text-center font-[family-name:var(--inter-font)] sm:p-8
            lg:px-[4rem] lg:pt-[4rem] lg:pb-[1.5rem]"
>
	<img
		src={picture}
		alt={pictureAlt}
		class="h-24 w-24 shrink-0 object-contain sm:h-32 sm:w-32 lg:h-[10rem] lg:w-[10rem]"
	/>

	<div class="pt-4 text-xl sm:text-2xl lg:pt-[2rem] lg:text-[2.25rem]">
		{title}
	</div>

	<div
		class="max-w-md pt-2 text-center text-sm leading-normal text-[#656565] sm:text-base sm:leading-relaxed
                lg:pt-[1rem] lg:text-[1.125rem] lg:leading-loose"
	>
		{description}
	</div>

	<div class="pt-4 text-sm break-all sm:text-base lg:pt-[2rem] lg:text-[1.5rem]">
		Pattern: {pattern}
	</div>
</div>
