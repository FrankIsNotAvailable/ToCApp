export interface BaseState<T> {
	data: T | null;
	isLoading: boolean;
	error: string | null;
	lastFetched: number | null;
}

export interface CachedData<T> {
	data: T;
	lastFetched: number;
	version: string;
	hash: string;
}

export interface SecureStoreConfig<T> {
	storageKey: string;
	cacheDuration?: number;
	storageVersion?: string;
	validate?: (data: unknown) => data is T;
	sanitize?: (data: T) => T;
}
