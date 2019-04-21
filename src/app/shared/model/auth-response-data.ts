export interface User {
    uid: string;
    email: string;
}

export interface SignUpLogInResponseData {
    accessToken: string;
    expiresIn: number;
    tokenType: string;
    state: string;
    idToken: string;
}


export function createHash(data: SignUpLogInResponseData): string {
    return '#accessToken=' + data.accessToken
        + '&expiresIn=' + data.expiresIn
        + '&tokenType=' + data.tokenType
        + '&state=' + data.state
        + '&idToken=' + data.idToken;
}

