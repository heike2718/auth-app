export interface User {
	uid: string;
	email: string;
}

export interface SignUpLogInResponseData {
	state: string;
	nonce?: string;
	idToken: string;
}


export function createHash(data: SignUpLogInResponseData): string {

	const nonce = data.nonce ? data.nonce : '';

	return '#state=' + data.state
		+ '&nonce=' + nonce
		+ '&idToken=' + data.idToken;
}

