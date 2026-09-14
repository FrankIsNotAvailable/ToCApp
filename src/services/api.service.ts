import apiClient from '$lib/axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiService {
	static async get<T = unknown>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return apiClient.get<T>(url, config);
	}

	static async post<T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		
		return apiClient.post<T>(url, data, config);
	}

	static async put<T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return apiClient.put<T>(url, data, config);
	}

	static async patch<T = unknown>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return apiClient.patch<T>(url, data, config);
	}

	static async delete<T = unknown>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return apiClient.delete<T>(url, config);
	}
}

export default ApiService;
