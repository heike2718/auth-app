export interface User {
	uid: string;
	email: string;
}

export interface SignUpLogInResponseData {
	accessToken: string;
	refreshToken: string;
	expiresAt: number;
	tokenType: string;
	state: string;
	nonce?: string;
	idToken: string;
}


export function createHash(data: SignUpLogInResponseData): string {

	const nonce = data.nonce ? data.nonce : '';

	return '#accessToken=' + data.accessToken
		+ '&refreshToken=' + data.refreshToken
		+ '&expiresAt=' + data.expiresAt
		+ '&tokenType=' + data.tokenType
		+ '&state=' + data.state
		+ '&nonce=' + nonce
		+ '&idToken=' + data.idToken;
}

