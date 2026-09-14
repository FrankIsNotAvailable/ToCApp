import { clearEncryptionKey } from './crypto';
import { browser } from '$app/environment';

export function clearAllSecureStorage(): void {
	if (!browser) return;

	try {
		clearEncryptionKey();

		const secureKeys = ['masking_data_enc', 'raw_data_enc', 'user_enc'];

		secureKeys.forEach((key) => {
			localStorage.removeItem(key);
		});
	} catch (error) {
		console.error('Error clearing secure storage:', error);
	}
}
