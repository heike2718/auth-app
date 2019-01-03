import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { emailValidator, passwortValidator, passwortPasswortWiederholtValidator } from '../shared/validation/app.validators';
import { AppConstants } from '../shared/app.constants';
import { Logger } from '@nsalaun/ng-logger';
import { Observable } from 'rxjs';
import { map, publishLast, refCount, filter, shareReplay, tap } from 'rxjs/operators';
import { AuthenticationRequest } from '../shared/model/authentication-request';
import { ClientService } from '../services/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  clientInformation$: Observable<AuthenticationRequest>;

  signInForm: FormGroup;

  agbGelesen: AbstractControl;

  email: AbstractControl;

  // TODO: loginName

  passwort: AbstractControl;

  passwortWdh: AbstractControl;

  kleber: AbstractControl;

  infoPasswortExpanded = false;

  tooltipPasswort: string;

  submitDisabled: true;



  constructor(private fb: FormBuilder, private clientService: ClientService, private logger: Logger, private route: ActivatedRoute) {
    this.signInForm = fb.group({
      'agbGelesen': [false, [Validators.requiredTrue]],
      'email': ['', [Validators.required, emailValidator]],
      'passwort': ['', [Validators.required, passwortValidator]],
      'passwortWdh': ['', [Validators.required, passwortValidator]],
      'kleber': ['']
    }, { validator: passwortPasswortWiederholtValidator });

    this.agbGelesen = this.signInForm.controls['agbGelesen'];
    this.email = this.signInForm.controls['email'];
    this.passwort = this.signInForm.controls['passwort'];
    this.passwortWdh = this.signInForm.controls['passwortWdh'];
    this.kleber = this.signInForm['kleber'];

    this.tooltipPasswort = AppConstants.tooltips.PASSWORTREGELN;

  }

  ngOnInit() {
    this.clientInformation$ = this.clientService.clientInformation$;

    let clientId = 'undefined';

    this.route.queryParams.pipe(
      filter(params => params.clientId)
    ).subscribe(
      params => clientId = params.clientId
    );

    if (clientId !== 'undefined') {
      this.clientService.getClient(clientId);
    }
  }


  togglePwdInfo(): void {
    this.infoPasswortExpanded = !this.infoPasswortExpanded;
  }

  submitUser(): void {
    this.logger.debug('about to submit ' + this.signInForm.value);
  }

  cancel(): void {

  }



  loadClient() {
    this.clientService.getClient('hajkshdqhdhqoi');
  }

}
