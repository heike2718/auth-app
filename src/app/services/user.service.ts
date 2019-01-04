import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RegistrationCredentials } from '../shared/model/registration-credentials';
import { AuthErrorService } from './auth-error.service';
import { environment } from '../../environments/environment';
import { createHash } from '../shared/model/auth-response-data';
import { map, publishLast, refCount, share } from 'rxjs/operators';
import { ResponsePayload } from '../shared/model/message';
import { AppData } from '../shared/app-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http, private authErrorService: AuthErrorService, private appData: AppData) {}

  public registerUser(registrationCredentials: RegistrationCredentials): void {

    const url = environment.apiUrl + '/users';

    // Bei Erfolg: ReponsePayload mit INFO-Message
    const redirectUrl = registrationCredentials.clientCredentials.redirectUrl;
    this.http.post(url, registrationCredentials).pipe(
      map(res => <ResponsePayload>res.json()),
      share()
    ).subscribe(
      payload => this.appData.updateRedirectUrl(redirectUrl + createHash(payload.data)),
      error => this.authErrorService.handleError(error, 'registerUser')
    )
  }
}



