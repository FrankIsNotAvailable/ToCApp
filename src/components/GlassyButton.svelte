<script lang="ts">
    let { children } = $props();
</script>

<div
	class="rounded-full inline-flex border border-white/40 bg-white/20 p-2 shadow-xl backdrop-blur-md backdrop-saturate-150"
>
	{@render children()}
</div>