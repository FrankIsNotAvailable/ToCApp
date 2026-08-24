import { writable } from 'svelte/store';
import { clearAllSecureStorage } from '$lib/storage-security';
import { getCookie, deleteCookie } from '$lib/cookie';

// Domain for cookie deletion — must match the domain used by the API when setting cookies.
// Empty string in development (cookies are host-scoped),  real domain on staging/production.
const COOKIE_DOMAIN = import.meta.env.VITE_COOKIE_DOMAIN || '';

interface AuthState {
	accessToken: string | null;
}

function createAuthStore() {
	const initialToken = getCookie('at');

	const { subscribe, set, update } = writable<AuthState>({
		accessToken: initialToken
	});

	return {
		subscribe,
		setAccessToken: (token: string | null) => {
			update((state) => ({ ...state, accessToken: token }));
		},
		clearAuth: () => {
			set({ accessToken: null });
			deleteCookie('at', COOKIE_DOMAIN || undefined);
			clearAllSecureStorage();
		},
		logout: () => {
			set({ accessToken: null });
			deleteCookie('at', COOKIE_DOMAIN || undefined);
			clearAllSecureStorage();
		},
		getAccessToken: (): string | null => {
			let token: string | null = null;
			subscribe((state) => {
				token = state.accessToken;
			})();
			return token;
		},
		isAuthenticated: (): boolean => {
			return !!getCookie('at');
		}
	};
}

export const authStore = createAuthStore();

