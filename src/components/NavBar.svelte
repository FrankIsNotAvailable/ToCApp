<script lang="ts">
    import profile from '$lib/assets/profileholder.png';
    import AuthGuard from '$guards/AuthGuard.svelte';
    import { useUser } from '$hooks/useUser';

    interface Props {
        userName?: string;
    }

    let { userName: customUserName }: Props = $props();
    const { user } = useUser();

    const displayName = $derived(
        customUserName ?? $user?.username ?? $user?.email ?? 'Invalid User'
    );
</script>

<div
    class="navBar z-1 flex shrink-0 items-center
            justify-between border-b border-white/35 bg-[var(--navbar-background)]/20 px-[0.5rem]
            py-[0.5rem] font-[family-name:var(--navbar-font)] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)]
            backdrop-blur-[5px]"
>
    <div class="navBarTitle px-[2rem] text-[3.5rem]">Obscura+</div>

    <AuthGuard requireAuth={true}>
        <div
            class="navBarButtons flex items-center justify-between gap-[1rem] px-[2rem]
                font-[family-name:var(--inter-font)] text-[1.25rem]"
        >
            {displayName}

            <button class="button h-[3rem] w-[3rem]">
                <img src={profile} alt="profile" class="navBarCreatePage" />
            </button>
        </div>

        {#snippet fallback()}
            <div
                class="navBarButtons flex items-center justify-between gap-[1rem] px-[2rem]
                    font-[family-name:var(--inter-font)] text-[1.25rem]"
            >
                {'Guest'}

                <div class="h-[3rem] w-[3rem]">
                    <img src={profile} alt="profile" class="navBarCreatePage" />
                </div>
            </div>
        {/snippet}
    </AuthGuard>
</div>