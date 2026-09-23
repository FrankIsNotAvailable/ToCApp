<script lang="ts">
	import type { Snippet } from 'svelte';
	import BaseCard from '$layouts/BaseCard.svelte';
	import Back from '$lib/assets/previous.svg';
	import Spinner from '$components/Spinner.svelte';

	let {
		title = 'Personal Information Entry',
		backHref = '/home',
		isLoading = false,
		errorMessage = null,
		children
	}: {
		title?: string;
		backHref?: string;
		isLoading?: boolean;
		errorMessage?: string | null;
		children?: Snippet;
	} = $props();
</script>

{#if isLoading}
	<div class="flex min-h-[300px] flex-1 flex-col items-center justify-center p-4">
		<Spinner size="lg" label="Loading data..." />
	</div>
{:else if errorMessage}
	<div class="flex min-h-[300px] flex-1 flex-col items-center justify-center gap-3 p-4">
		<p class="text-center font-masked-data text-base text-red-500 sm:text-lg">{errorMessage}</p>
	</div>
{:else}
	<div class="flex w-full flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6 md:px-8">
		<div class="relative w-full max-w-5xl">
			<div class="mb-4 xl:mb-0">
				<a
					href={backHref}
					class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/25 transition-transform hover:scale-105 sm:h-14 sm:w-14
                    xl:absolute xl:top-0 xl:-left-20 xl:h-16 xl:w-16 2xl:-left-24"
					aria-label="Go back"
				>
					<img src={Back} alt="previous" class="h-5 sm:h-6 xl:h-8" />
				</a>
			</div>

			<BaseCard>
				<div class="flex w-full flex-col gap-4 sm:gap-6">
					<h1
						class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl"
					>
						{title}
					</h1>
					{@render children?.()}
				</div>
			</BaseCard>
		</div>
	</div>
{/if}
