import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, publishLast, refCount, tap } from 'rxjs/operators';
import { AuthErrorService } from './auth-error.service';
import { Logger } from '@nsalaun/ng-logger';
import { environment } from '../../environments/environment';
import { AppData } from '../shared/app-data.service';
import { ClientCredentials, createQueryParameters } from '../shared/model/client-information';

/** ClientService holt die Daten zum Client */
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private authErrorService: AuthErrorService, private logger: Logger, private appData: AppData) { }

  getClient(clientCredentials: ClientCredentials): void {

    const url = environment.apiUrl + '/clients' + createQueryParameters(clientCredentials);

    this.http.get(url).pipe(
      publishLast(),
      refCount(),
      map(res => res.json()),
      tap(client => this.logger.debug('clientId=' + client.clientId))
    ).subscribe(
      client => this.appData.updateClientInformation(client),
      error => this.authErrorService.handleError(error, 'registerUser')
    );
  }
}
