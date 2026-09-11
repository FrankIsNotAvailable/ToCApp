<script lang="ts">
	import type { Snippet } from 'svelte';
	import { authStore } from '$stores/auth.store';

	interface Props {
		requireAuth: boolean;
		children: Snippet;
		fallback?: Snippet;
	}

	let { requireAuth = true, children, fallback }: Props = $props();

	const isAuthenticated = $derived(!!$authStore.accessToken);

	const canRender = $derived(!requireAuth || isAuthenticated);
</script>

{#if canRender}
	{@render children()}
{:else if fallback}
	{@render fallback()}
{/if}
