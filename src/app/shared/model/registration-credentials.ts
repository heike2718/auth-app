import { ClientCredentials } from './client-information';
export interface RegistrationCredentials {

	email: string;
	loginName: string;
	vorname?: string;
	nachname?: string;
	passwort: string;
	passwortWdh: string;
	agbGelesen: boolean;
	kleber: string;
	clientCredentials: ClientCredentials;

}

