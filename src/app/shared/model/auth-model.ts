export interface ClientCredentials {
	accessToken: string;
	redirectUrl: string;
	state: string;
}

export interface ClientInformation {
	// clientId: string;
	name: string;
	zurueckText: string;
	agbUrl: string;
	loginnameSupported: boolean;
	namenRequired: boolean;
	baseUrl: string;
}

export interface AuthorizationCredentials {
	loginName: string;
	passwort: string;
	kleber: string;
}

export interface LoginCredentials {
	authorizationCredentials: AuthorizationCredentials;
	clientCredentials: ClientCredentials;
}




export interface TwoPasswords {
	passwort: string;
	passwortWdh: string;
}

export interface RegistrationCredentials {

	email: string;
	loginName: string;
	vorname?: string;
	nachname?: string;
	groups?: string;
	agbGelesen: boolean;
	twoPasswords: TwoPasswords;
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
	twoPasswords: TwoPasswords;
}

export function createQueryParameters(clientCredentials: ClientCredentials) {
	return '?accessToken=' + clientCredentials.accessToken + '&redirectUrl=' + clientCredentials.redirectUrl + '&state=' + '';
}



