import { writable, get } from 'svelte/store';
import { clearAllSecureStorage } from '$lib/storage-security';

interface AuthState {
    accessToken: string | null;
}

function createAuthStore() {
    // Access token starts in memory as null on fresh page reloads.
    // Call your backend /refresh endpoint on app launch to populate it.
    const { subscribe, set, update } = writable<AuthState>({
        accessToken: null
    });

    return {
        subscribe,
        setAccessToken: (token: string | null) => {
            update((state) => ({ ...state, accessToken: token }));
        },
        clearAuth: () => {
            set({ accessToken: null });
            clearAllSecureStorage();
        },
        logout: () => {
            set({ accessToken: null });
            clearAllSecureStorage();
        },
        getAccessToken: (): string | null => {
            return get(authStore).accessToken;
        },
        isAuthenticated: (): boolean => {
            return !!get(authStore).accessToken;
        }
    };
}

export const authStore = createAuthStore();