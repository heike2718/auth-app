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
	baseUrl: string;
}

export interface LoginCredentials {
	loginName: string;
	passwort: string;
	kleber: string;
	clientCredentials: ClientCredentials;
}

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

export interface TempPasswordCredentials {

	email: string;
	clientCredentials: ClientCredentials;
	kleber: string;
}

export interface ChangeTempPasswordPayload {

	tokenId: string;
	tempPassword: string;
	email: string;
	passwort: string;
	passwortWdh: string;
}



export function createQueryParameters(clientCredentials: ClientCredentials) {
	return '?clientId=' + clientCredentials.clientId + '&redirectUrl=' + clientCredentials.redirectUrl;
}



