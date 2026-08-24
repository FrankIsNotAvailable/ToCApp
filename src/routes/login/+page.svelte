<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/state';
    import AuthService from '$services/auth.service';
    import { authStore } from '$stores/auth.store';

    let isLoading = false;
    let errorMessage = '';

    const getRedirectUri = () => `${window.location.origin}/login`;

    onMount(async () => {
        if ($authStore.accessToken) {
            await goto('/dashboard');
            return;
        }

        const code = page.url.searchParams.get('code');
        const googleError = page.url.searchParams.get('error');

        if (googleError) {
            errorMessage = 'Google authentication was cancelled or failed.';
            return;
        }

        if (code) {
            await handleGoogleCallback(code);
        }
    });

    async function initiateGoogleLogin() {
        isLoading = true;
        errorMessage = '';

        try {
            const googleUrl = await AuthService.getGoogleAuthUrl(getRedirectUri());
            window.location.href = googleUrl;
        } catch (error: any) {
            errorMessage = error.response?.data?.error || 'Failed to initiate Google login.';
            isLoading = false;
        }
    }

    async function handleGoogleCallback(code: string) {
        isLoading = true;
        errorMessage = '';

        try {
            await AuthService.googleLogin(code, getRedirectUri());
        } catch (error: any) {
            errorMessage = error.response?.data?.error || 'Authentication failed. Please try again.';
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg border border-gray-100">
        <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            <p class="mt-2 text-sm text-gray-600">
                Authentication powered by Google OAuth
            </p>
        </div>

        {#if errorMessage}
            <div class="rounded-md bg-red-50 p-4 border border-red-200">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-red-800">{errorMessage}</p>
                    </div>
                </div>
            </div>
        {/if}

        <div class="mt-8">
            <button
                type="button"
                on:click={initiateGoogleLogin}
                disabled={isLoading}
                class="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-150 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {#if isLoading}
                    <svg class="h-5 w-5 animate-spin text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                {:else}
                    <svg class="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Sign in with Google</span>
                {/if}
            </button>
        </div>
    </div>
</div>