import type { MaskingData, MaskingDataResponse } from '$appTypes/masking-data.type';
import { createSecureStore } from './create-secure-store';

import { derived, get } from 'svelte/store';

const STORAGE_KEY = 'masking_data_enc';
const CACHE_DURATION = 1 * 60 * 1000;

const baseStore = createSecureStore<MaskingDataResponse>({
	storageKey: STORAGE_KEY,
	cacheDuration: CACHE_DURATION
});

function createMaskingDataStore() {
	return {
		subscribe: baseStore.subscribe,
		setMaskingDataList: (maskingDataList: MaskingDataResponse) =>
			baseStore.setData(maskingDataList),
		setLoading: (isLoading: boolean) => baseStore.setLoading(isLoading),
		setError: (error: string | null) => baseStore.setError(error),
		clearMaskingData: () => baseStore.clearData(),
		updateMaskingData: (updates: Partial<MaskingDataResponse>) =>
			baseStore.updateData(updates),
		isCacheValid: () => baseStore.isCacheValid(),
		updateMaskingDataById: (id: string, updates: Partial<MaskingData>) => {
            const currentState = get(baseStore);
            if (!currentState.data) return;

            const existingIndex = currentState.data.data.findIndex((m) => m.id === id);
            const updatedList = [...currentState.data.data];

            if (existingIndex !== -1) {
                updatedList[existingIndex] = {
                    ...updatedList[existingIndex],
                    ...updates
                };
            } else {
                updatedList.push(updates as MaskingData);
            }

            baseStore.setData({
                ...currentState.data,
                data: updatedList
            });
        }
	};
}

export const maskingDataStore = createMaskingDataStore();
export const maskingData = derived(maskingDataStore, ($store) => $store.data);
export const isLoading = derived(maskingDataStore, ($store) => $store.isLoading);
export const error = derived(maskingDataStore, ($store) => $store.error);
