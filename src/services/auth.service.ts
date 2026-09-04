import ApiService from './api.service';
import { authStore } from '$stores/auth.store';
import { userStore} from '$stores/user.store';
import type { RefreshTokenResponse } from '$types/api.type';

export class AuthService {
    static async googleLogin(code: string, redirectUri: string): Promise<void> {
        const response = await ApiService.post<{ access: string }>('/auth/login/', {
            provider: 'google',
            code: code,
            redirect_uri: redirectUri
        }, {
            withCredentials: true 
        });

        const accessToken = response.data.access;
        authStore.setAccessToken(accessToken);
    }

	static async refreshAccessToken(): Promise<string> {
		const response = await ApiService.get<RefreshTokenResponse>('/auth/refresh', { withCredentials: true });
		const accessToken = response.data.at;
		authStore.setAccessToken(accessToken);
		return accessToken;
	}

	static async logout(): Promise<void> {
		try {
			await ApiService.post('/auth/logout', { withCredentials: true });
		} catch {
			console.error('Error occurred while logging out.');
		}
        authStore.clearAuth();
		userStore.clearUser();
	}

	static getAccessToken(): string | null {
		return authStore.getAccessToken();
	}

	static setAccessToken(token: string): void {
		authStore.setAccessToken(token);
	}

	static async tryRestoreSession(): Promise<boolean> {
		try {
			const accessToken = await AuthService.refreshAccessToken();
			return !!accessToken;
		} catch {
			authStore.clearAuth();
			return false;
		}
	}
}

export default AuthService;
