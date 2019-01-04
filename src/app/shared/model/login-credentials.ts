import { ClientCredentials } from './client-information';

export interface LoginCredentials {
    redirectUrl: string;
    email: string;
    loginName: string;
    passwort: string;
    kleber: string;
    clientCredentials: ClientCredentials;
}

