<script lang="ts">
    let { 
        size = 'md', 
        label = 'Loading data...' 
    }: { 
        size?: 'sm' | 'md' | 'lg'; 
        label?: string 
    } = $props();

    const sizeClasses = {
        sm: 'h-6 w-6 border-2',
        md: 'h-10 w-10 border-3',
        lg: 'h-14 w-14 border-4'
    };
</script>

<div class="flex flex-col items-center justify-center gap-3 p-4">
    <div
        class="animate-spin rounded-full border-t-transparent border-white/60 {sizeClasses[size]}"
        role="status"
        aria-label="loading"
    ></div>
    {#if label}
        <p class="font-masked-data text-sm font-medium text-slate-600 sm:text-base">
            {label}
        </p>
    {/if}
</div>