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

	function handleLogout() {
		AuthService.logout();
		window.location.reload();
	}
</script>

<svelte:window onclick={closeMenu} />

<div
	class="navBar sticky top-0 z-40 flex w-full shrink-0 items-center justify-between
            border-b border-white/35 bg-[var(--navbar-background)]/20
            px-3 py-2 font-[family-name:var(--navbar-font)]
            shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)] backdrop-blur-[5px]
            sm:px-6 md:py-3"
>
	<AuthGuard requireAuth={true}>
		<a
			href="/home"
			class="navBarTitle shrink-0 text-lg font-normal tracking-tight sm:text-2xl lg:text-[3rem]"
		>
			Obscura+
		</a>

		<div
			class="navBarButtons flex items-center justify-end gap-2 font-[family-name:var(--inter-font)]
                   text-xs sm:gap-4 sm:text-sm md:text-base lg:text-[1.25rem]"
		>
			<span class="max-w-[80px] truncate sm:max-w-[150px] md:max-w-xs">{displayName}</span>

			<div class="relative h-7 w-7 shrink-0 sm:h-9 sm:w-9 md:h-11 md:w-11">
				<img
					src={profile}
					alt="profile"
					class="navBarCreatePage h-full w-full rounded-full object-cover"
				/>
				<button
					class="profile-menu absolute -right-0.5 -bottom-0.5 flex h-3.5 w-3.5 cursor-pointer items-center
                            justify-center rounded-full bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
                            transition-transform hover:scale-110 sm:h-4 sm:w-4 md:h-5 md:w-5"
					onclick={toggleMenu}
					aria-label="Toggle profile menu"
				>
					<img src={arrowdown} alt="arrow down" class="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3" />
				</button>

				{#if showMenu}
					<button
						class="absolute top-full right-0 z-50 mt-2 flex w-24 cursor-pointer items-center gap-2 rounded-lg border
		                border-gray-100 bg-white px-3 py-2 whitespace-nowrap shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] transition-colors
		                hover:bg-gray-100 sm:px-4 lg:w-28"
						onclick={handleLogout}
					>
						<img src={logout} alt="logout" class="h-4 w-4 sm:h-5 sm:w-5" />
						<span class="text-xs font-medium text-gray-900 sm:text-sm">Log out</span>
					</button>
				{/if}
			</div>
		</div>

		{#snippet fallback()}
			<a
				href="/"
				class="navBarTitle shrink-0 text-lg font-normal tracking-tight sm:text-2xl lg:text-[3rem]"
			>
				Obscura+
			</a>
			<div
				class="navBarButtons flex items-center justify-end gap-2 font-[family-name:var(--inter-font)]
                       text-xs sm:gap-4 sm:text-sm md:text-base lg:text-[1.25rem]"
			>
				<span class="whitespace-nowrap">Guest</span>

				<div class="h-7 w-7 shrink-0 sm:h-9 sm:w-9 md:h-11 md:w-11">
					<img
						src={profile}
						alt="profile"
						class="navBarCreatePage h-full w-full rounded-full object-cover"
					/>
				</div>
			</div>
		{/snippet}
	</AuthGuard>
</div>
