import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, publishLast, refCount, filter, shareReplay, tap } from 'rxjs/operators';
import { ClientInformation } from '../shared/model/client-information';
import { Logger } from '@nsalaun/ng-logger';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private subject: BehaviorSubject<ClientInformation> = new BehaviorSubject<ClientInformation>({
    clientId: 'unbekannt',
    agbUrl: '',
    loginnameSupported: true
  });

  clientInformation$: Observable<ClientInformation> = this.subject.asObservable().pipe(
    filter(client => client.clientId !== 'unbekannt')
  );

  constructor(private http: Http, private logger: Logger) { }

  getClient(clientId: string): Observable<ClientInformation> {

    const url = environment.apiUrl + '/clients/' + clientId;

    const obs$ = this.http.get(url).pipe(
      publishLast(),
      refCount(),
      map(res => res.json()),
      tap( client => this.logger.debug('clientId=' + client.clientId))
    );

    obs$.subscribe(
      client => this.subject.next(client)
    );

    return obs$;
  }
}
