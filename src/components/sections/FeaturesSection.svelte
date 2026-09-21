<script lang="ts">
	import FeatureCard from '$components/cards/FeatureCard.svelte';
	import { features } from '$constants/features';
</script>

<div id="features"
	class="flex min-h-[calc(100vh-var(--navbar-height))] flex-col items-center gap-8 px-5 pt-4 pb-16 sm:px-8 md:gap-10 md:px-0 md:pb-20 lg:px-[clamp(4rem,15vw,20rem)]"
>
	<div class="font-(family-name:--navbar-font) text-[clamp(4rem,10vw,10rem)] leading-none">
		FEATURES
	</div>

	<a href="/test/masking" class="flex w-full flex-1 flex-col gap-6 md:flex-row md:gap-8">
		{#each features as feature}
			<FeatureCard {...feature} />
		{/each}
	</a>
</div>
