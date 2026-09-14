export function getCookie(name: string): string | null {
	if (typeof document === 'undefined') return null;
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	return match ? decodeURIComponent(match[2]) : null;
}

export function deleteCookie(name: string, domain?: string): void {
	if (typeof document === 'undefined') return;
	const domainPart = domain ? `; domain=${domain}` : '';
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainPart}; secure; samesite=Lax`;
}
