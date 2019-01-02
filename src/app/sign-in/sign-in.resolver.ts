import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../shared/model/authentication-request';
import { ClientService } from '../services/client.service';

@Injectable({
    providedIn: 'root'
})
export class SignInResolver implements Resolve<AuthenticationRequest> {

    constructor(private clientService: ClientService) {}

    resolve(route: ActivatedRouteSnapshot,
        _state: RouterStateSnapshot): Observable<AuthenticationRequest> {

            const clientId = route.params['clientId'];
            if (clientId) {
                return this.clientService.getClient(clientId);
            }

            return undefined;

        }

}

