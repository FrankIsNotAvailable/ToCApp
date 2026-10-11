import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { encryptData, decryptData, hashData } from '$lib/crypto';
import type { SecureStoreConfig, CachedData, BaseState } from '$appTypes/store.type';

export function createSecureStore<T>(config: SecureStoreConfig<T>) {
	const {
		storageKey,
		cacheDuration = 5 * 60 * 1000,
		storageVersion = '1.0',
		validate,
		sanitize
	} = config;

	async function loadFromCache(): Promise<CachedData<T> | null> {
		if (!browser) return null;

		try {
			const encryptedCache = localStorage.getItem(storageKey);
			if (!encryptedCache) return null;

			const decrypted = await decryptData(encryptedCache);
			const data = JSON.parse(decrypted);

			if (!data || typeof data !== 'object') {
				throw new Error('Invalid cache structure');
			}

			if (data.version !== storageVersion) {
				console.warn(`Cache version mismatch for ${storageKey}, clearing cache`);
				localStorage.removeItem(storageKey);
				return null;
			}

			const dataString = JSON.stringify(data.data);
			const dataToHash = dataString + data.lastFetched + data.version;
			const expectedHash = await hashData(dataToHash);

			if (data.hash !== expectedHash) {
				console.error(`Cache integrity check failed for ${storageKey}, data may be corrupted`);
				localStorage.removeItem(storageKey);
				return null;
			}

			if (validate && !validate(data.data)) {
				throw new Error('Invalid data structure');
			}

			if (typeof data.lastFetched !== 'number' || data.lastFetched < 0) {
				throw new Error('Invalid timestamp');
			}

			const now = Date.now();

			if (now - data.lastFetched < cacheDuration) {
				return data as CachedData<T>;
			}

			localStorage.removeItem(storageKey);
			return null;
		} catch {
			localStorage.removeItem(storageKey);
			return null;
		}
	}

	async function saveToCache(dataToCache: T): Promise<void> {
		if (!browser) return;

		try {
			if (validate && !validate(dataToCache)) {
				console.error(`Invalid data for ${storageKey}, not caching`);
				return;
			}

			const processedData = sanitize ? sanitize(dataToCache) : dataToCache;

			const lastFetched = Date.now();
			const dataString = JSON.stringify(processedData);

			const dataToHash = dataString + lastFetched + storageVersion;
			const hash = await hashData(dataToHash);

			const cacheData: CachedData<T> = {
				data: processedData,
				lastFetched,
				version: storageVersion,
				hash
			};

			const serialized = JSON.stringify(cacheData);

			if (serialized.length > 3 * 1024 * 1024) {
				console.warn(`Cache data too large for ${storageKey}, not storing`);
				return;
			}

			const encrypted = await encryptData(serialized);

			localStorage.setItem(storageKey, encrypted);
		} catch (error) {
			if (error instanceof Error && error.name === 'QuotaExceededError') {
				console.error(`localStorage quota exceeded for ${storageKey}, clearing old cache`);
				clearCache();
			} else {
				console.error(`Error saving cache for ${storageKey}:`, error);
			}
		}
	}

	function clearCache(): void {
		if (!browser) return;

		try {
			localStorage.removeItem(storageKey);
		} catch (error) {
			console.error(`Error clearing cache for ${storageKey}:`, error);
		}
	}

	const initialState: BaseState<T> = {
		data: null,
		isLoading: false,
		error: null,
		lastFetched: null
	};

	const { subscribe, set, update } = writable<BaseState<T>>(initialState);

	if (browser) {
		loadFromCache().then((cachedData) => {
			if (cachedData) {
				update((state) => ({
					...state,
					data: cachedData.data,
					lastFetched: cachedData.lastFetched
				}));
			}
		});
	}

	return {
		subscribe,

		setData: async (data: T) => {
			const now = Date.now();
			update((state) => ({ ...state, data, error: null, lastFetched: now }));
			await saveToCache(data);
		},

		setLoading: (isLoading: boolean) => {
			update((state) => ({ ...state, isLoading }));
		},

		setError: (error: string | null) => {
			update((state) => ({ ...state, error, isLoading: false }));
		},

		clearData: () => {
			set({ data: null, isLoading: false, error: null, lastFetched: null });
			clearCache();
		},

		updateData: async (updates: Partial<T>) => {
			let updatedData: T | null = null;

			update((state) => {
				if (!state.data) return state;

				updatedData = { ...state.data, ...updates };

				return {
					...state,
					data: updatedData
				};
			});

			if (updatedData) {
				await saveToCache(updatedData);
			}
		},

		isCacheValid: async (): Promise<boolean> => {
			if (!browser) return false;
			const cached = await loadFromCache();
			return cached !== null;
		},

		_cache: {
			load: loadFromCache,
			save: saveToCache,
			clear: clearCache
		}
	};
}
