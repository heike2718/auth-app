import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { emailValidator, passwortValidator, passwortPasswortWiederholtValidator } from '../shared/validation/app.validators';
import { AppConstants } from '../shared/app.constants';
import { Logger } from '@nsalaun/ng-logger';
import { Observable } from 'rxjs';
import { map, publishLast, refCount, filter, shareReplay, tap } from 'rxjs/operators';
import { ClientInformation } from '../shared/model/client-information';
import { ClientService } from '../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  clientInformation$: Observable<ClientInformation>;

  signInForm: FormGroup;

  agbGelesen: AbstractControl;

  loginName: AbstractControl;

  email: AbstractControl;

  // TODO: loginName

  passwort: AbstractControl;

  passwortWdh: AbstractControl;

  kleber: AbstractControl;

  infoPasswortExpanded = false;

  tooltipPasswort: string;

  submitDisabled: true;

  showClientId: boolean;

  constructor(private fb: FormBuilder, private clientService: ClientService, private logger: Logger, private route: ActivatedRoute) {
    this.signInForm = fb.group({
      'agbGelesen': [false, [Validators.requiredTrue]],
      'loginName': ['', Validators.maxLength(255)],
      'email': ['', [Validators.required, emailValidator]],
      'passwort': ['', [Validators.required, passwortValidator]],
      'passwortWdh': ['', [Validators.required, passwortValidator]],
      'kleber': ['']
    }, { validator: passwortPasswortWiederholtValidator });

    this.agbGelesen = this.signInForm.controls['agbGelesen'];
    this.loginName = this.signInForm.controls['loginName'];
    this.email = this.signInForm.controls['email'];
    this.passwort = this.signInForm.controls['passwort'];
    this.passwortWdh = this.signInForm.controls['passwortWdh'];
    this.kleber = this.signInForm['kleber'];

    this.tooltipPasswort = AppConstants.tooltips.PASSWORTREGELN;
    this.showClientId = !environment.production;
  }

  ngOnInit() {
    this.clientInformation$ = this.clientService.clientInformation$;

    let clientId = 'undefined';
    let redirectUrl = 'undefined';

    this.route.queryParams.pipe(
      filter(params => params.clientId || params.redirectUrl)
    ).subscribe(
      params => {
        clientId = params.clientId;
        redirectUrl = params.redirectUrl;
      }
    );

    if (clientId !== 'undefined') {
      this.clientService.getClient(clientId, redirectUrl);
    }
  }


  togglePwdInfo(): void {
    this.infoPasswortExpanded = !this.infoPasswortExpanded;
  }

  submitUser(): void {
    this.logger.debug('about to submit ' + this.signInForm.value);
  }

  cancel(): void {
    window.close();
  }
}
