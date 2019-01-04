
export interface ClientCredentials {
    clientId: string;
    redirectUrl: string;
}

export interface ClientInformation {
    clientId: string;
    agbUrl: string;
    loginnameSupported: boolean;
}

export function createQueryParameters(clientCredentials: ClientCredentials) {
    return '?clientId=' + clientCredentials.clientId + '&redirectUrl=' + clientCredentials.redirectUrl;
}


