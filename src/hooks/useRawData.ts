import { get } from 'svelte/store';
import { rawDataStore, isLoading, error, rawData } from '$stores/raw-data.store';
import { MaskingDataService } from '$services/masking-data.service';
import type { RawData } from '$appTypes/raw-data.type';

export function useRawData() {
    const fetchRawDataById = async (
        id: string,
        forceRefresh: boolean = false
    ): Promise<RawData | null> => {
        const storeState = get(rawDataStore);
        const cacheValid = await rawDataStore.isCacheValid();

        const isCachedItem = storeState.data?.id === id;

        const shouldFetch = !isCachedItem || !cacheValid || forceRefresh;

        if (!shouldFetch) {
            return storeState.data;
        }

        try {
            rawDataStore.setLoading(true);
            const rawData = await MaskingDataService.getRawDataById(id);

            if (rawData) {
                rawDataStore.setRawData(rawData);
            }

            return rawData;
        } catch (error) {
            console.error('Error fetching raw data by id:', error);
            rawDataStore.setError(error instanceof Error ? error.message : 'Failed to fetch item');
            throw error;
        } finally {
            rawDataStore.setLoading(false);
        }
    };

    const clearRawData = () => {
        rawDataStore.clearRawData();
    };

    const getRawData = (): RawData | null => {
        return get(rawDataStore).data;
    };

    const isCacheValid = (): Promise<boolean> => {
        return rawDataStore.isCacheValid();
    };

    return {
        fetchRawDataById,
        clearRawData,
        getRawData,
        isCacheValid,

        isLoading,
        error,
        rawData,

        store: rawDataStore
    };
}
