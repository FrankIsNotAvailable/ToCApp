<script lang="ts">
	import Github from '$lib/assets/githublogo.svg';
	import Youtube from '$lib/assets/youtubelogo.svg';
	import Footer from '$components/sections/Footer.svelte';
	import InfoCard from '$components/cards/InfoCard.svelte';
	import { youtubeLink, gitBackendLink, gitFrontendLink } from '$constants/info';

	const infoCards = [
		{
			title: 'Youtube',
			linkUrl: youtubeLink.url,
			linkTitle: youtubeLink.title,
			imageSrc: Youtube,
			imageAlt: 'youtube logo',
			imagePosition: 'left' as const
		},
		{
			title: 'Source code',
			linkUrl: gitBackendLink.url,
			linkTitle: gitBackendLink.title,
			imageSrc: Github,
			imageAlt: 'github logo',
			imagePosition: 'right' as const
		},
		{
			title: 'Source code',
			linkUrl: gitFrontendLink.url,
			linkTitle: gitFrontendLink.title,
			imageSrc: Github,
			imageAlt: 'github logo',
			imagePosition: 'right' as const
		}
	];
</script>

<div class="flex min-h-screen flex-col justify-between" id="more-info">
	<div
		class="flex flex-1 flex-col gap-10 px-5 pt-12 sm:px-8 md:gap-12 md:px-12 md:pt-16 lg:px-[7rem]"
	>
		<div
			class="self-end font-[family-name:var(--navbar-font)] text-[clamp(4rem,10vw,10rem)] leading-none"
		>
			MORE INFO
		</div>

		<div
			class="my-auto flex flex-col items-stretch justify-center gap-6 lg:flex-row lg:items-center lg:gap-8"
		>
			{#each infoCards as card}
				<InfoCard {...card} />
			{/each}
		</div>
	</div>

	<Footer />
</div>
