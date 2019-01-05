export interface User {
    uid: string;
    email: string;
}

export interface SignInLogInResponseData {
    accessToken: string;
    expiresIn: number;
    tokenType: string;
    state: string;
    idToken: string;
}


export function createHash(data: SignInLogInResponseData): string {
    return '#accessToken=' + data.accessToken
        + '&expiresIn=' + data.expiresIn
        + '&tokenType=' + data.tokenType
        + '&state=' + data.state
        + '&idToken=' + data.idToken;
}

