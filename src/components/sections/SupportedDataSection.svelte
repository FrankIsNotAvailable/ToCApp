<script lang="ts">
	import SupportedData from '$components/SupportedData.svelte';
	import { supportedCards } from '$constants/support-data';

	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let currentNumber = $state(1);

	onMount(() => {
		const interval = setInterval(() => {
			currentNumber = currentNumber === 5 ? 1 : currentNumber + 1;
		}, 2750);

		return () => clearInterval(interval);
	});
</script>

<div id="supported-data"
	class="flex lg:h-200 min-h-[calc(100vh-var(--navbar-height))] w-full flex-col items-center justify-center gap-10 px-5 py-12 sm:px-8 sm:py-16 md:px-12 lg:flex-row lg:justify-between lg:gap-16 lg:px-[clamp(4rem,15vw,20rem)] lg:py-12"
>
	<div
		class="font-[family-name:var(--navbar-font)] text-[clamp(3.5rem,8vw,8rem)] leading-none lg:whitespace-nowrap"
	>
		<div>SUPPORTED</div>
		<div>DATA</div>
		<div>TYPE</div>
	</div>

	<div class="h-120 max-h-200 w-full max-w-xl shrink-0 sm:h-136 lg:h-full lg:w-[40%] lg:max-w-none">
		<div
			class="flex h-full w-full flex-col justify-between overflow-hidden rounded-[17px] border border-white/25 bg-white/50 p-12 shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)] sm:p-8"
		>
			<div class="relative min-h-0 w-full flex-1 overflow-hidden">
				{#key currentNumber}
					<div
						class="absolute inset-0 h-full w-full overflow-y-auto break-normal"
						in:fly={{ x: 500, duration: 1000 }}
						out:fly={{ x: -500, duration: 1000 }}
					>
						<SupportedData {...supportedCards[currentNumber - 1]} />
					</div>
				{/key}
			</div>

			<div class="flex items-center justify-center gap-2 pt-6">
				{#each Array(5) as _, i}
					<div
						class={`h-3 w-3 rounded-full ${
							i + 1 === currentNumber ? 'bg-[#484848]' : 'bg-[#929292]'
						}`}
					></div>
				{/each}
			</div>
		</div>
	</div>
</div>