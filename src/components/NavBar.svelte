<script lang="ts">
    import profile from '$lib/assets/profile.svg';
    import arrowdown from '$lib/assets/arrowdown.svg';
    import AuthGuard from '$guards/AuthGuard.svelte';
    import { useUser } from '$hooks/useUser';

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

    interface Props {
        userName?: string;
    }

    let { userName: customUserName }: Props = $props();
    const { user } = useUser();

    const displayName = $derived(
        customUserName ?? $user?.username ?? $user?.email ?? 'Invalid User'
    );
</script>

<svelte:window onclick={closeMenu} />

<div
    class="navBar z-1 flex shrink-0 items-center sticky top-0
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
                <button class="absolute flex items-center justify-center bottom-0 right-0
                                h-[1rem] w-[1rem] rounded-full bg-white cursor-pointer
                                shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] profile-menu"
                        onclick={toggleMenu}>
                    <img src={arrowdown} alt="arrow down"/>
                </button>

                {#if showMenu}
                    <div class="absolute flex flex-col rounded-lg bg-white whitespace-nowrap
                                right-0 mt-[0.25rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
                        <button class="text-gray-800 transition-colors duration-200 rounded-lg
                                        hover:bg-gray-200 cursor-pointer px-[1rem] py-[0.25rem]">
                            Log out
                        </button>
                    </div>
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