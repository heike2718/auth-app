import { Injectable } from '@angular/core';
import { TempPasswordCredentials } from '../shared/model/temp-pwd-payloads';

@Injectable({
	providedIn: 'root'
})
export class TempPasswordService {


	constructor() { }

	requestTempPassword(tempPasswordCredentials: TempPasswordCredentials) {
		throw new Error("Method not implemented.");
	}

}


