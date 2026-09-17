<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div
	class="isolate flex w-full max-w-full transform-gpu flex-col gap-4 overflow-hidden rounded-xl border border-white/35
    bg-white/40 p-4 font-(family-name:--inter-font) text-sm font-semibold
    shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] backdrop-blur-3xl sm:gap-6 sm:rounded-3xl sm:p-8 sm:text-base md:gap-8 md:p-14 lg:max-w-5xl"
>
	{@render children()}
</div>