<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { onDestroy } from 'svelte';
    import successImg from '$lib/assets/correct.png';

    export let isVisible = false;
    
    export let status: 
        | 'masking_text' 
        | 'done_masking_text' 
        | 'masking_data' 
        | 'done_masking_data' 
        | 'editing_data' 
        | 'done_editing_data' = 'masking_data';

    let timeoutId: ReturnType<typeof setTimeout> | undefined;


    $: isSuccess = status.startsWith('done_');

    $: if (isVisible && isSuccess) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            isVisible = false;
        }, 3000);
    }

    onDestroy(() => {
        if (timeoutId) clearTimeout(timeoutId);
    });

    $: if (!isVisible && timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
    }

    function getDisplayText(currentStatus: string) {
        switch (currentStatus) {
            case 'masking_text': return 'masking text';
            case 'done_masking_text': return 'done masking text';
            case 'masking_data': return 'masking data';
            case 'done_masking_data': return 'done masking data';
            case 'editing_data': return 'editing data';
            case 'done_editing_data': return 'done editing data';
            default: return '';
        }
    }
</script>

{#if isVisible}
    <div
        class="fixed right-6 top-30 z-50 flex items-center rounded-xl border border-white/80 bg-[#FFFFFF]/40 px-6 py-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
        in:fly={{ x: 50, duration: 300 }}
        out:fade={{ duration: 180 }}
    >
        {#if !isSuccess}
            <svg
                class="h-7 w-7 animate-spin text-gray-500"
                viewBox="0 0 24 24"
                aria-label="loading"
                role="status"
            >
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2.5" fill="none" stroke-opacity="0.25" />
                <path
                    d="M12 3a9 9 0 0 1 8.77 6.4"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    fill="none"
                />
            </svg>
        {:else}
            <img 
                src={successImg} 
                alt="success" 
                class="h-7 w-7 object-contain" 
            />
        {/if}

        <div class="mx-4 h-6 w-px bg-[#A1A1A1]"></div>
        <p class="text-sm font-[Inter] text-black">
            {getDisplayText(status)}
        </p>
    </div>
{/if}