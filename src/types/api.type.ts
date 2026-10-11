export interface ApiError {
	message: string;
	statusCode: number;
	error?: string;
}

export interface RefreshTokenResponse {
	at: string;
}
