import { Injectable } from '@angular/core';
import { TempPasswordCredentials } from '../shared/model/temp-pwd-payloads';
import { Logger } from '@nsalaun/ng-logger';
import { map, publishLast, refCount, tap } from 'rxjs/operators';
import { ResponsePayload, MessagesService } from 'hewi-ng-lib';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TempPasswordService {


	constructor(private http: HttpClient
		, private messageService: MessagesService
		, private logger: Logger) { }

	orderTempPassword(tempPasswordCredentials: TempPasswordCredentials): Observable<any> {

		this.logger.debug('orderTempPassword: start');
		const url = environment.apiUrl + '/temppwd';

		return this.http.post(url, tempPasswordCredentials).pipe(
			map(res => <ResponsePayload>res),
			publishLast(),
			refCount(),
			tap(
				() => this.logger.debug('orderTempPassword: inside pipe')
			)
		);
	}
}


