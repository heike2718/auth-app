import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, publishLast, refCount, filter } from 'rxjs/operators';
import { AuthenticationRequest } from '../shared/model/authentication-request';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private subject: BehaviorSubject<AuthenticationRequest> = new BehaviorSubject<AuthenticationRequest>(undefined);

  clientInformation$: Observable<AuthenticationRequest> = this.subject.asObservable().pipe(
    filter(_clientInfo => !!undefined)
  );

  constructor(private http: Http) { }

  getClient(clientId: string): Observable<AuthenticationRequest> {

    const url = environment.apiUrl + '/clients/' + clientId;

    this.http.get(url).pipe(
      map(res => <AuthenticationRequest>res.json()),
      publishLast(),
      refCount()
    ).subscribe(
      client => {
        this.subject.next(client);
        return this.clientInformation$;
      }
    );

    return this.clientInformation$;
  }
}
