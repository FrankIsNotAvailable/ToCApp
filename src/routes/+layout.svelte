<script lang="ts">
	import RootLayout from '$layouts/RootLayout.svelte';
	let { children } = $props();
</script>

<RootLayout>
	{@render children()}
</RootLayout>
