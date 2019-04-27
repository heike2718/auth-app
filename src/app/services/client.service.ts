import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, publishLast, refCount, tap } from 'rxjs/operators';
import { HttpErrorService } from '../error/http-error.service';
import { Logger } from '@nsalaun/ng-logger';
import { environment } from '../../environments/environment';
import { AppData } from '../shared/app-data.service';
import { ClientCredentials, createQueryParameters } from '../shared/model/client-information';
import { ResponsePayload } from 'hewi-ng-lib';

/** ClientService holt die Daten zum Client */
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient, private httpErrorService: HttpErrorService, private logger: Logger, private appData: AppData) { }

  getClient(clientCredentials: ClientCredentials): void {

    const url = environment.apiUrl + '/clients' + createQueryParameters(clientCredentials);

    this.http.get<ResponsePayload>(url).pipe(
      publishLast(),
      refCount()
    ).subscribe(
      respPayload => this.appData.updateClientInformation(respPayload.payload),
      error => this.httpErrorService.handleError(error, 'getClient')
    );
  }
}
