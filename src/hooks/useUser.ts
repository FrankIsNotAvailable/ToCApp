import { get } from 'svelte/store';
import { userStore, isLoading, error, user } from '$stores/user.store';
import { UserService } from '$services/user.service';
import type { User } from '$appTypes/user.type';

export function useUser() {
	const fetchMyData = async (forceRefresh: boolean = false): Promise<User | null> => {
		const cacheValid = await userStore.isCacheValid();

		const shouldFetch = !cacheValid || forceRefresh;

		if (shouldFetch) {
			try {
				userStore.setLoading(true);
				const userData = await UserService.getMyData();
                userStore.setUser(userData);
				userStore.setLoading(false);
				return userData;
			} catch (error) {
				console.error('Error fetching user data:', error);
				userStore.setError(error instanceof Error ? error.message : 'Failed to fetch user data');
				userStore.setLoading(false);
				return null;
			}
		}

		return get(userStore).data;
	};

	return {
		fetchMyData,
		isLoading,
		error,
		user,
		store: userStore
	};
}
