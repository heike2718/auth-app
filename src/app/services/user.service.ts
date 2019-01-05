import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RegistrationCredentials } from '../shared/model/registration-credentials';
import { AuthErrorService } from './auth-error.service';
import { environment } from '../../environments/environment';
import { createHash } from '../shared/model/auth-response-data';
import { map, publishLast, refCount, share, finalize, first, tap } from 'rxjs/operators';
import { ResponsePayload } from '../shared/model/message';
import { AppData } from '../shared/app-data.service';
import { Logger } from '@nsalaun/ng-logger';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http, private authErrorService: AuthErrorService, private appData: AppData, private logger: Logger) {}

  public registerUser(registrationCredentials: RegistrationCredentials): void {

    this.logger.debug('registerUser: start');

    // const headers = new Headers(); headers.append('Content-Type', 'application/json');
    const url = environment.apiUrl + '/users';

    // Bei Erfolg: ReponsePayload mit INFO-Message
    const redirectUrl = registrationCredentials.clientCredentials.redirectUrl;

    this.http.post(url, registrationCredentials).pipe(
      map(res => <ResponsePayload>res.json()),
      publishLast(),
      refCount(),
      tap(
        () => this.logger.debug('inside pipe')
      )
    ).subscribe(
      payload => {
        this.appData.updateRedirectUrl(redirectUrl + createHash(payload.data));
      },
      error => this.authErrorService.handleError(error, 'registerUser'),
      () => this.logger.debug('post call completed')
    );
  }
}



