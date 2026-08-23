import { get } from 'svelte/store';
import { maskingDataStore, isLoading, error, maskingData } from '$stores/masking-data.store';
import { MaskingDataService } from '$services/masking-data.service';
import type { MaskingData, MaskingDataResponse, UpdateMaskingDataPayload } from '$types/masking-data.type';

export function useMaskingData() {
    const fetchMaskingDataList = async (
        page: number = 1,
        pageSize: number = 20,
        orderBy?: 'ASC' | 'DESC',
        forceRefresh: boolean = false
    ): Promise<MaskingDataResponse | null> => {
        const cacheValid = await maskingDataStore.isCacheValid();

        const shouldFetch = !cacheValid || forceRefresh;

        if (shouldFetch) {
            try {
                maskingDataStore.setLoading(true);
                const maskingData = await MaskingDataService.getMaskingDataList(
                    {
                        page,
                        pageSize,
                        orderBy
                    }
                );
                maskingDataStore.setMaskingDataList(maskingData);
                maskingDataStore.setError(null);
                return maskingData;
            } catch (error) {
                console.error('Error fetching masking data list:', error);
                maskingDataStore.setError(error instanceof Error ? error.message : 'Failed to fetch masking data');
                return null;
            } finally {
                maskingDataStore.setLoading(false);
            }
        }

        return get(maskingDataStore).data;
    };

    const fetchMaskingDataById = async (
        id: string,
        forceRefresh: boolean = false
    ): Promise<MaskingData | null> => {
        const storeState = get(maskingDataStore);
        const cacheValid = await maskingDataStore.isCacheValid();

        const cachedItem = storeState.data?.data.find((item) => item.id === id);

        const shouldFetch = !cachedItem || !cacheValid || forceRefresh;

        if (!shouldFetch) {
            return cachedItem;
        }

        try {
            maskingDataStore.setLoading(true);
            const maskingData = await MaskingDataService.getMaskingDataById(id);

            if (maskingData) {
                maskingDataStore.updateMaskingDataById(id, maskingData);
            }

            return maskingData;
        } catch (error) {
            console.error('Error fetching masking data by id:', error);
            maskingDataStore.setError(error instanceof Error ? error.message : 'Failed to fetch item');
            throw error;
        } finally {
            maskingDataStore.setLoading(false);
        }
    };

    const deleteMaskingData = async (id: string): Promise<void> => {
        try {
            maskingDataStore.setLoading(true);
            await MaskingDataService.deleteMaskingData(id);
            
            const current = get(maskingDataStore).data;
            if (current) {
                maskingDataStore.setMaskingDataList({
                    ...current,
                    data: current.data.filter((m) => m.id !== id),
                    meta: { ...current.meta, total: Math.max(0, current.meta.total - 1) }
                });
            }
        } catch (err) {
            console.error(`Error deleting masking data item ${id}:`, err);
            maskingDataStore.setError(err instanceof Error ? err.message : 'Failed to delete item');
            throw err;
        } finally {
            maskingDataStore.setLoading(false);
        }
    };

    const refreshMaskingDataList = async (
        page: number = 1,
        pageSize: number = 20,
        orderBy?: 'ASC' | 'DESC',
    ): Promise<MaskingDataResponse | null> => {
        return fetchMaskingDataList(page, pageSize, orderBy, true);
    };

    const updateMaskingDataList = (updates: Partial<MaskingDataResponse>) => {
        maskingDataStore.updateMaskingData(updates);
    };

    const updateMaskingDataById = async (
        id: string,
        updates: UpdateMaskingDataPayload
    ): Promise<MaskingData | null> => {
        try {
            maskingDataStore.setLoading(true);
            maskingDataStore.setError(null);

            const updatedItem = await MaskingDataService.updateMaskingData(id, updates);

            maskingDataStore.updateMaskingDataById(id, updatedItem);

            return updatedItem;
        } catch (err) {
            console.error(`Error updating masking data item ${id}:`, err);
            maskingDataStore.setError(
                err instanceof Error ? err.message : 'Failed to update masking data item'
            );
            return null;
        } finally {
            maskingDataStore.setLoading(false);
        }
    };

    const clearMaskingDataList = () => {
        maskingDataStore.clearMaskingData();
    };

    const getMaskingDataList = (): MaskingDataResponse | null => {
        return get(maskingDataStore).data;
    };

    const isCacheValid = (): Promise<boolean> => {
        return maskingDataStore.isCacheValid();
    };

    return {
        fetchMaskingDataList,
        fetchMaskingDataById,
        deleteMaskingData,
        refreshMaskingDataList,
        updateMaskingDataById,

        updateMaskingDataList,
        clearMaskingDataList,

        getMaskingDataList,
        isCacheValid,

        isLoading,
        error,
        maskingData,

        store: maskingDataStore
    };
}
