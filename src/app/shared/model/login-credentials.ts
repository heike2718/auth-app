import { ClientCredentials } from './client-information';

export interface LoginCredentials {
    redirectUrl: string;
    loginName: string;
    passwort: string;
    kleber: string;
    clientCredentials: ClientCredentials;
}

