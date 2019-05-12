import { ClientCredentials } from './client-information';

export interface LoginCredentials {
    loginName: string;
    passwort: string;
    kleber: string;
    clientCredentials: ClientCredentials;
}

