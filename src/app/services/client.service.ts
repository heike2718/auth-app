import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, publishLast, refCount, filter, shareReplay, tap } from 'rxjs/operators';
import { AuthenticationRequest } from '../shared/model/authentication-request';
import { Logger } from '@nsalaun/ng-logger';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private subject: BehaviorSubject<AuthenticationRequest> = new BehaviorSubject<AuthenticationRequest>({
    clientId: 'unbekannt',
    agbUrl: '',
    loginnameSupported: true,
    redirectUri: ''
  });

  clientInformation$: Observable<AuthenticationRequest> = this.subject.asObservable();

  constructor(private http: Http, private logger: Logger) { }

  getClient(clientId: string): Observable<AuthenticationRequest> {

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
