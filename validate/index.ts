export function isHttpLink(url: string) {
	return url.startsWith('http://') || url.startsWith('https://');
}
