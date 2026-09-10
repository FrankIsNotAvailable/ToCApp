<script lang="ts">
	import profile from '$lib/assets/profile.svg';
	import arrowdown from '$lib/assets/arrowdown.svg';
	import AuthGuard from '$guards/AuthGuard.svelte';
	import { useUser } from '$hooks/useUser';
	import logout from '$lib/assets/logout.svg';
    import AuthService from '$services/auth.service';

	interface Props {
		userName?: string;
	}

	let { userName: customUserName }: Props = $props();

	const { user } = useUser();

	const displayName = $derived(customUserName ?? $user?.username ?? $user?.email ?? 'Invalid User');
    let showMenu = $state(false);

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function closeMenu(event: MouseEvent) {
		const target = event.target as HTMLElement;

		if (!target.closest('.profile-menu')) {
			showMenu = false;
		}
	}

    function handleLogout(){
        AuthService.logout();
        window.location.reload();
    }
</script>

<svelte:window onclick={closeMenu} />

<div
	class="navBar sticky top-0 z-1 flex shrink-0 items-center
            justify-between border-b border-white/35 bg-(--navbar-background)/20 px-2
            py-2 font-(family-name:--navbar-font) shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)]
            backdrop-blur-[5px]"
>
	<div class="navBarTitle px-8 text-[3.5rem]">Obscura+</div>

	<AuthGuard requireAuth={true}>
		<div
			class="navBarButtons flex items-center justify-between gap-4 px-8
                font-(family-name:--inter-font) text-[1.25rem]"
		>
			{displayName}

			<div class="relative h-12 w-12">
				<img src={profile} alt="profile" class="navBarCreatePage" />
				<button
					class="profile-menu absolute right-0 bottom-0 flex h-4
                                w-4 items-center justify-center rounded-full cursor-pointer
                                bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
					onclick={toggleMenu}
				>
					<img src={arrowdown} alt="arrow down" />
				</button>

				{#if showMenu}
					<button
						class="absolute right-0 mt-1 flex whitespace-nowrap flex-wrap rounded-lg bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:bg-gray-200 cursor-pointer"
                        onclick={handleLogout}
					>
						<div class="flex items-center gap-2 rounded-lg px-4 py-2 mr-2">
							<img src={logout} alt="logout" class="h-6 w-6" />
							<div
								class="rounded-lg pr-4 py-1 text-gray-900"
							>
								Log out
							</div>
						</div>
					</button>
				{/if}
			</div>
		</div>

		{#snippet fallback()}
			<div
				class="navBarButtons flex items-center justify-between gap-4 px-8
                    font-(family-name:--inter-font) text-[1.25rem]"
			>
				{'Guest'}

				<div class="h-12 w-12">
					<img src={profile} alt="profile" class="navBarCreatePage" />
				</div>
			</div>
		{/snippet}
	</AuthGuard>
</div>
