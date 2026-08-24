import type { User } from '$types/user.type';
import { createSecureStore } from './create-secure-store';

import { derived } from 'svelte/store';

const STORAGE_KEY = 'user_enc';
const CACHE_DURATION = 10 * 60 * 60 * 1000;

const baseStore = createSecureStore<User>({
	storageKey: STORAGE_KEY,
	cacheDuration: CACHE_DURATION
});

function createUserStore() {
	return {
		subscribe: baseStore.subscribe,
		setUser: (user: User) => baseStore.setData(user),
		setLoading: (isLoading: boolean) => baseStore.setLoading(isLoading),
		setError: (error: string | null) => baseStore.setError(error),
		clearUser: () => baseStore.clearData(),
		updateUser: (updates: Partial<User>) => baseStore.updateData(updates),
		isCacheValid: () => baseStore.isCacheValid()
	};
}

export const userStore = createUserStore();

export const user = derived(userStore, ($store) => $store.data);
export const isLoading = derived(userStore, ($store) => $store.isLoading);
export const error = derived(userStore, ($store) => $store.error);
