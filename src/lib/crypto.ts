const ALGORITHM = 'AES-GCM';
const KEY_LENGTH = 256;
const IV_LENGTH = 12;
const SALT_LENGTH = 16;

async function deriveKey(password: string, salt: BufferSource): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);

    const keyMaterial = await crypto.subtle.importKey(
        'raw', 
        passwordBuffer, 
        'PBKDF2', 
        false, 
        ['deriveBits', 'deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        { name: ALGORITHM, length: KEY_LENGTH },
        false,
        ['encrypt', 'decrypt']
    );
}

function generateSessionKey(): string {
	const array = new Uint8Array(32);
	crypto.getRandomValues(array);
	return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function getEncryptionKey(): string {
	if (typeof window === 'undefined') return '';

	const STORAGE_KEY = 'enc_key';
	let key = localStorage.getItem(STORAGE_KEY);

	if (!key) {
		key = generateSessionKey();
		localStorage.setItem(STORAGE_KEY, key);
	}

	return key;
}

export function clearEncryptionKey(): void {
	if (typeof window === 'undefined') return;
	localStorage.removeItem('enc_key');
}

export async function encryptData(data: string): Promise<string> {
	try {
		const encoder = new TextEncoder();
		const dataBuffer = encoder.encode(data);

		const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
		const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

		const password = getEncryptionKey();
		const key = await deriveKey(password, salt);

		const encryptedBuffer = await crypto.subtle.encrypt(
			{
				name: ALGORITHM,
				iv: iv
			},
			key,
			dataBuffer
		);

		const encryptedArray = new Uint8Array(encryptedBuffer);
		const combined = new Uint8Array(salt.length + iv.length + encryptedArray.length);
		combined.set(salt, 0);
		combined.set(iv, salt.length);
		combined.set(encryptedArray, salt.length + iv.length);

		return standardBase64Encode(combined);
	} catch (error) {
		console.error('Encryption failed:', error);
		throw new Error('Failed to encrypt data');
	}
}

function standardBase64Encode(bytes: Uint8Array): string {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

export async function decryptData(encryptedData: string): Promise<string> {
	try {
		const combined = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0));

		const salt = combined.slice(0, SALT_LENGTH);
		const iv = combined.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
		const encryptedBuffer = combined.slice(SALT_LENGTH + IV_LENGTH);

		const password = getEncryptionKey();
		const key = await deriveKey(password, salt);

		const decryptedBuffer = await crypto.subtle.decrypt(
			{
				name: ALGORITHM,
				iv: iv
			},
			key,
			encryptedBuffer
		);

		const decoder = new TextDecoder();
		return decoder.decode(decryptedBuffer);
	} catch (error) {
		console.error('Decryption failed:', error);
		throw new Error('Failed to decrypt data - data may be corrupted or tampered');
	}
}

export async function hashData(data: string): Promise<string> {
	const encoder = new TextEncoder();
	const dataBuffer = encoder.encode(data);
	const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
