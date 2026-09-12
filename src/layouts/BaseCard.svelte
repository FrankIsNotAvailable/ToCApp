<script lang="ts">
    import type { Snippet } from 'svelte';

    let { children }: { children: Snippet } = $props();
</script>

<div
    class="isolate flex w-full max-w-5xl flex-col gap-5 rounded-2xl border border-white/35
    bg-white/40 p-6 shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] backdrop-blur-3xl transform-gpu
    font-(family-name:--inter-font) text-base font-semibold sm:gap-8 sm:rounded-3xl sm:p-10 md:p-14"
>
    {@render children()}
</div>