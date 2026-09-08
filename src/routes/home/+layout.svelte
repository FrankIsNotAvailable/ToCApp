<script lang="ts">
	import Navbar from '$components/NavBar.svelte';
	import { onMount, type Snippet } from 'svelte';
	import { goto } from '$app/navigation';
	import AuthService from '$services/auth.service';
	import { authStore } from '$stores/auth.store';
	import { useUser } from '$hooks/useUser';

	let { children }: { children: Snippet } = $props();
	let isInitializing = $state(true);

	onMount(async () => {
		try {
			if (!authStore.isAuthenticated()) {
				await AuthService.tryRestoreSession();
			}

			if (!authStore.isAuthenticated()) {
				await goto('/login', { replaceState: true });
			}
			await useUser().fetchMyData();
		} catch (error) {
			console.error('Session initialization error:', error);
			await goto('/login', { replaceState: true });
		} finally {
			isInitializing = false;
		}
	});
</script>

{#if isInitializing}
	<div class="flex h-screen items-center justify-center">
		<p>Loading application...</p>
	</div>
{:else}
	<Navbar />
	<div class="flex min-h-screen flex-col items-center">
		<div class="w-full max-w-5xl px-4 py-6">
			{@render children()}
		</div>
	</div>
{/if}
