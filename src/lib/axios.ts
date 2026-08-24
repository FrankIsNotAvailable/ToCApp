import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { authStore } from '$stores/auth.store';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });

    failedQueue = [];
};

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true 
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = authStore.getAccessToken();

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

        if (!originalRequest) {
            return Promise.reject(error);
        }

        const isRefreshUrl = originalRequest.url?.includes('/auth/refresh/');

        if (error.response?.status === 401 && !originalRequest._retry && !isRefreshUrl) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => {
                        const token = authStore.getAccessToken();
                        if (token && originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return apiClient(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await axios.post<{ at: string }>(
                    `${API_BASE_URL}/auth/refresh/`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = response.data.at;
                authStore.setAccessToken(newAccessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                processQueue();
                isRefreshing = false;

                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as Error);
                isRefreshing = false;
                authStore.clearAuth();

                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;