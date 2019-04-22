export interface User {
    uid: string;
    email: string;
}

export interface SignUpLogInResponseData {
    accessToken: string;
    expiresAt: number;
    tokenType: string;
    state: string;
    idToken: string;
}


export function createHash(data: SignUpLogInResponseData): string {
    return '#accessToken=' + data.accessToken
        + '&expiresAt=' + data.expiresAt
        + '&tokenType=' + data.tokenType
        + '&state=' + data.state
        + '&idToken=' + data.idToken;
}

