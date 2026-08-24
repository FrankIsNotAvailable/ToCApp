export interface AuthResponse {
	accessToken: string;
}

export interface ApiError {
	message: string;
	statusCode: number;
	error?: string;
}

export interface RefreshTokenResponse {
	access_token: string;
}
