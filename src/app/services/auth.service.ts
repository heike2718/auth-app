import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponsePayload } from 'hewi-ng-lib';
import { environment } from 'src/environments/environment.qs';
import { map, publishLast, refCount } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private httpClient: HttpClient) { }


	createAnonymousSession(): Observable<ResponsePayload> {

		const url = environment.apiUrl + '/session';

		return this.httpClient.get(url).pipe(
			map(res => res as ResponsePayload),
			publishLast(),
			refCount()
		);
	}
}
