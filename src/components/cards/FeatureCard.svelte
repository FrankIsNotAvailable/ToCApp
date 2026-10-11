<script lang="ts">
	interface Props {
		title: string;
		icon: string;
		iconAlt?: string;
		description: string;
	}

	let { title, icon, iconAlt = title, description }: Props = $props();
</script>

<div
	class="group flex min-h-[18rem] flex-1 cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-[17px] border border-white/25 bg-[#D9D9D9]/20 p-6 shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] transition-all duration-500 ease-in-out hover:bg-white/50 md:min-h-0 md:p-0 md:hover:flex-[1.6]"
>
	<div
		class="text-center text-[1.5rem] font-medium text-[#1E1E1E] opacity-100 md:max-h-0 md:overflow-hidden md:text-[2rem] md:opacity-0 md:transition-all md:duration-500 md:group-hover:mt-[2rem] md:group-hover:max-h-[4rem] md:group-hover:opacity-100"
	>
		{title}
	</div>

	<div
		class="flex flex-none items-center justify-center md:flex-1 md:transition-all md:duration-500 md:group-hover:my-[1rem] md:group-hover:flex-none"
	>
		<img
			src={icon}
			alt={iconAlt}
			class="h-16 w-16 transition-transform duration-500 sm:h-20 sm:w-20 md:group-hover:-translate-y-1 md:group-hover:scale-110"
		/>
	</div>
	<div
		class="max-h-none overflow-visible px-2 pb-2 text-center text-sm leading-relaxed text-[#424752] opacity-100 md:max-h-0 md:overflow-hidden md:px-[2rem] md:pb-0 md:text-[0.875rem] md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-[12rem] md:group-hover:pb-[2rem] md:group-hover:opacity-100"
	>
		{description}
	</div>
</div>