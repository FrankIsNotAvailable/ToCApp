<script lang="ts">
	interface Props {
		title: string;
		linkUrl: string;
		linkTitle: string;
		imageSrc: string;
		imageAlt?: string;
		imagePosition?: 'left' | 'right';
	}

	let {
		title,
		linkUrl,
		linkTitle,
		imageSrc,
		imageAlt = 'logo',
		imagePosition = 'left'
	}: Props = $props();
</script>

<a
	href={linkUrl}
	target="_blank"
	rel="noopener noreferrer"
	class="group grid w-full grid-cols-1 items-center overflow-hidden rounded-[17px] border border-white/25 bg-[#D9D9D9]/20 p-6 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)] sm:p-8 lg:w-auto lg:p-[3rem] lg:transition-[grid-template-columns] lg:duration-500 lg:ease-in-out {imagePosition ===
	'left'
		? 'lg:grid-cols-[auto_0fr] lg:hover:grid-cols-[auto_1fr]'
		: 'lg:grid-cols-[0fr_auto] lg:hover:grid-cols-[1fr_auto]'}"
>
	{#if imagePosition === 'left'}
		<img
			src={imageSrc}
			alt={imageAlt}
			class="mx-auto h-24 w-24 shrink-0 sm:h-32 sm:w-32 lg:mx-0 lg:h-[10rem] lg:w-[10rem]"
		/>
	{/if}

	<div
		class="mt-4 flex min-w-0 flex-col items-center overflow-hidden text-center lg:mt-0 lg:whitespace-nowrap lg:opacity-0 lg:transition-all lg:duration-500 lg:ease-in-out lg:group-hover:opacity-100 {imagePosition ===
		'left'
			? 'lg:ml-0 lg:items-start lg:text-left lg:group-hover:ml-[3rem]'
			: 'order-2 lg:order-1 lg:mr-0 lg:items-end lg:text-right lg:group-hover:mr-[3rem]'}"
	>
		<div class="text-[2rem] sm:text-[2.5rem] lg:text-[3rem]">{title}</div>
		<p
			class="text-base break-all text-[#7B7B7B] underline active:translate-y-[1px] sm:text-xl lg:text-[2.5rem] lg:break-normal"
		>
			{linkTitle}
		</p>
	</div>

	{#if imagePosition === 'right'}
		<img
			src={imageSrc}
			alt={imageAlt}
			class="order-1 mx-auto h-24 w-24 shrink-0 sm:h-32 sm:w-32 lg:order-2 lg:mx-0 lg:h-[10rem] lg:w-[10rem]"
		/>
	{/if}
</a>