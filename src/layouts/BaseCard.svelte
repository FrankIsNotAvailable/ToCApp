<script>
    let { children } = $props();

</script>

<div class="flex flex-col w-[60%] px-14 py-12 rounded-3xl
            bg-white/40 shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] isolate overflow-hidden transform-gpu
            font-(family-name:--inter-font) text-[1rem] font-semibold
            border border-white/35 gap-8 max-w-6xl">
    {@render children()}
</div>