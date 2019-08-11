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
	idToken: string;
}


export function createHash(data: SignUpLogInResponseData): string {
	return '#accessToken=' + data.accessToken
		+ '&refreshToken=' + data.refreshToken
		+ '&expiresAt=' + data.expiresAt
		+ '&tokenType=' + data.tokenType
		+ '&state=' + data.state
		+ '&idToken=' + data.idToken;
}

