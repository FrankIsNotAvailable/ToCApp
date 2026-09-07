import type { RawData } from '$appTypes/raw-data.type';
import { createSecureStore } from './create-secure-store';

import { derived } from 'svelte/store';

const STORAGE_KEY = 'raw_data_enc';
const CACHE_DURATION = 5 * 60 * 1000;

const baseStore = createSecureStore<RawData>({
    storageKey: STORAGE_KEY,
    cacheDuration: CACHE_DURATION
});

function createRawDataStore() {
    return {
        subscribe: baseStore.subscribe,
        setRawData: (rawData: RawData) =>
            baseStore.setData(rawData),
        setLoading: (isLoading: boolean) => baseStore.setLoading(isLoading),
        setError: (error: string | null) => baseStore.setError(error),
        clearRawData: () => baseStore.clearData(),
        updateRawData: (updates: Partial<RawData>) =>
            baseStore.updateData(updates),
        isCacheValid: () => baseStore.isCacheValid()
    };
}

export const rawDataStore = createRawDataStore();
export const rawData = derived(rawDataStore, ($store) => $store.data);
export const isLoading = derived(rawDataStore, ($store) => $store.isLoading);
export const error = derived(rawDataStore, ($store) => $store.error);
