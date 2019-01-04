import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { emailValidator, passwortValidator, passwortPasswortWiederholtValidator } from '../shared/validation/app.validators';
import { AppConstants } from '../shared/app.constants';
import { Logger } from '@nsalaun/ng-logger';
import { Observable } from 'rxjs';
import { map, publishLast, refCount, filter, shareReplay, tap } from 'rxjs/operators';
import { ClientInformation, ClientCredentials } from '../shared/model/client-information';
import { ClientService } from '../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { SignInLogInResponseData } from '../shared/model/auth-response-data';
import { AppData } from '../shared/app-data.service';
import { RegistrationCredentials } from '../shared/model/registration-credentials';
import { ModalService } from '../shared/components/modal/modal.service';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  clientInformation$: Observable<ClientInformation>;

  redirectUrl$: Observable<string>;

  private clientCredentials: ClientCredentials;

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

  private redirectUrl = '';


  constructor(private fb: FormBuilder,
    private clientService: ClientService,
    private userService: UserService,
    private appData: AppData,
    private modalService: ModalService,
    private logger: Logger,
    private route: ActivatedRoute) {

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
    this.clientInformation$ = this.appData.clientInformation$;
    this.redirectUrl$ = this.appData.redirectUrl$;

    this.loadClientInformation();

    // this.redirectUrl$.pipe(
    //   filter(str => str.length > 0)
    // ).subscribe(
    //   _str => this.openModal()
    // );
  }

  private loadClientInformation() {
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
      this.clientCredentials = {
        clientId: clientId,
        redirectUrl: redirectUrl
      };
      this.appData.updateClientCredentials(this.clientCredentials);
      this.clientService.getClient(this.clientCredentials);
    }
  }

  private openModal(): void {
    this.modalService.open();
  }


  togglePwdInfo(): void {
    this.infoPasswortExpanded = !this.infoPasswortExpanded;
  }

  submitUser(): void {
    this.logger.debug('about to submit ' + this.signInForm.value);

    const registrationCredentials: RegistrationCredentials = {
      agbGelesen: this.agbGelesen.value,
      clientCredentials: this.clientCredentials,
      email: this.email.value.trim(),
      kleber: this.kleber ? this.kleber.value : null,
      loginName: this.loginName ? this.loginName.value.trim() : null,
      passwort: this.passwort.value,
      passwortWdh: this.passwortWdh.value
    };

    this.userService.registerUser(registrationCredentials);
    // this.openModal();
  }

  closeModalAndSendRedirect() {
    this.modalService.close();
    window.location.href = this.redirectUrl;
  }

  cancel(): void {
    window.close();
  }
}
