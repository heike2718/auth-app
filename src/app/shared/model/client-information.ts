
export interface ClientCredentials {
    clientId: string;
    redirectUrl: string;
}

export interface ClientInformation {
    clientId: string;
    name: string;
    zurueckText: string;
    agbUrl: string;
    loginnameSupported: boolean;
    namenRequired: boolean;
}

export function createQueryParameters(clientCredentials: ClientCredentials) {
    return '?clientId=' + clientCredentials.clientId + '&redirectUrl=' + clientCredentials.redirectUrl;
}


