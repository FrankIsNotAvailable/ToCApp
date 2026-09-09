<script lang="ts">
    import profile from '$lib/assets/profile.svg';
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

            <button class="button h-12 w-12">
                <img src={profile} alt="profile" class="navBarCreatePage" />
            </button>
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