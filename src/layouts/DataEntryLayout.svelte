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
    <div class="flex flex-1 flex-col items-center justify-center min-h-[300px]">
        <Spinner size="lg" label="Loading data..." />
    </div>
{:else if errorMessage}
    <div class="flex flex-1 flex-col items-center justify-center gap-3">
        <p class="text-center font-masked-data text-[18px] text-red-500">{errorMessage}</p>
    </div>
{:else}
    <div class="flex flex-1 flex-col items-center justify-center">
        <div class="relative w-full max-w-5xl">
            <a
                href={backHref}
                class="absolute top-0 -left-24 flex h-18 w-18 items-center justify-center rounded-full
                border border-white/40 bg-white/25 transition-transform hover:scale-105"
            >
                <img src={Back} alt="previous" class="h-8" />
            </a>

            <BaseCard>
                <div class="flex flex-col">
                    <p class="text-[3rem]">{title}</p>
                </div>
                {@render children?.()}
            </BaseCard>
        </div>
    </div>
{/if}