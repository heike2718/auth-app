import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationCredentials } from '../shared/model/registration-credentials';
import { HttpErrorService } from '../error/http-error.service';
import { environment } from '../../environments/environment';
import { createHash } from '../shared/model/auth-response-data';
import { map, publishLast, refCount, tap } from 'rxjs/operators';
import { ResponsePayload } from 'hewi-ng-lib';
import { AppData } from '../shared/app-data.service';
import { Logger } from '@nsalaun/ng-logger';
import { LoginCredentials } from '../shared/model/login-credentials';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private httpErrorService: HttpErrorService, private appData: AppData, private logger: Logger) { }

  public registerUser(registrationCredentials: RegistrationCredentials): void {

    this.logger.debug('registerUser: start');

    // const headers = new Headers(); headers.append('Content-Type', 'application/json');
    const url = environment.apiUrl + '/users';

    // Bei Erfolg: ReponsePayload mit INFO-Message
    const redirectUrl = registrationCredentials.clientCredentials.redirectUrl;

    this.http.post(url, registrationCredentials).pipe(
      map(res => <ResponsePayload>res),
      publishLast(),
      refCount(),
      tap(
        () => this.logger.debug('inside pipe')
      )
    ).subscribe(
      payload => {
        this.appData.updateRedirectUrl(redirectUrl + createHash(payload.data));
      },
      error => this.httpErrorService.handleError(error, 'registerUser'),
      () => this.logger.debug('post call completed')
    );
  }

  public loginUser(loginCredentials: LoginCredentials): void {

    this.logger.debug('loginUser: start');

    // const headers = new Headers(); headers.append('Content-Type', 'application/json');
    const url = environment.apiUrl + '/auth/sessions';

    // Bei Erfolg: ReponsePayload mit INFO-Message
    const redirectUrl = loginCredentials.clientCredentials.redirectUrl;

    this.http.post(url, loginCredentials).pipe(
      map(res => <ResponsePayload>res),
      publishLast(),
      refCount(),
      tap(
        () => this.logger.debug('inside pipe')
      )
    ).subscribe(
      payload => {
        this.appData.updateRedirectUrl(redirectUrl + createHash(payload.data));
      },
      error => this.httpErrorService.handleError(error, 'registerUser'),
      () => this.logger.debug('post call completed')
    );
  }
}



