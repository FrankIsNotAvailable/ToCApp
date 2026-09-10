<script lang="ts">
	import type { Snippet } from 'svelte';
	import { authStore } from '$stores/auth.store';
	import AuthService from '$services/auth.service';

	interface Props {
		requireAuth: boolean;
		children: Snippet;
		fallback?: Snippet;
	}

	let { requireAuth = true, children, fallback }: Props = $props();

	let isChecking = $state(!authStore.isAuthenticated());

	let isAuthenticated = $derived(!!$authStore.accessToken);

	$effect(() => {
		if (!authStore.isAuthenticated()) {
			AuthService.tryRestoreSession().finally(() => {
				isChecking = false;
			});
		} else {
			isChecking = false;
		}
	});

	let canRender = $derived(!requireAuth || (isAuthenticated && !isChecking));
</script>

{#if canRender}
	{@render children()}
{:else if fallback}
	{@render fallback()}
{/if}
