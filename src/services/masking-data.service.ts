import ApiService from './api.service';
import type { MaskingData, MaskingDataQueryParams, UpdateMaskingDataPayload, MaskingDataResponse } from '$appTypes/masking-data.type';


export class MaskingDataService {
	static async getMaskingDataById(id: string): Promise<MaskingData> {
		const response = await ApiService.get<MaskingData>(`/masking-data/${id}`);
		return response.data;
	}

	static async getMaskingDataList(query: MaskingDataQueryParams): Promise<MaskingDataResponse> {
		const params = new URLSearchParams({
			page: query.page.toString(),
			pageSize: query.pageSize.toString()
		});

		if (query.orderBy) {
			params.append('order', query.orderBy);
		}

		const response = await ApiService.get<MaskingDataResponse>(`/masking-data?${params.toString()}`);
		return response.data;
	}

	static async updateMaskingData(id: string, data: UpdateMaskingDataPayload): Promise<MaskingData> {
		const response = await ApiService.patch<MaskingData>(`/masking-data/${id}`, data);
		return response.data;
	}

	static async deleteMaskingData(id: string): Promise<void> {
		await ApiService.delete(`/masking-data/${id}`);
	}
}

export default MaskingDataService;
