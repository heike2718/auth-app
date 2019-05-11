import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { emailValidator, passwortValidator, passwortPasswortWiederholtValidator } from '../shared/validation/app.validators';
import { AppConstants } from '../shared/app.constants';
import { Logger } from '@nsalaun/ng-logger';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClientInformation, ClientCredentials } from '../shared/model/client-information';
import { ClientService } from '../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { AppData } from '../shared/app-data.service';
import { RegistrationCredentials } from '../shared/model/registration-credentials';
import { MessagesService } from 'hewi-ng-lib';

@Component({
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  clientInformation$: Observable<ClientInformation>;

  redirectUrl$: Observable<string>;

  private clientCredentials: ClientCredentials;

  signUpForm: FormGroup;

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
    private messagesService: MessagesService,
    private logger: Logger,
    private route: ActivatedRoute) {

    this.signUpForm = this.fb.group({
      'agbGelesen': [false, [Validators.requiredTrue]],
      'email': ['', [Validators.required, emailValidator]],
      'passwort': ['', [Validators.required, passwortValidator]],
      'passwortWdh': ['', [Validators.required, passwortValidator]],
      'kleber': ['']
    }, { validator: passwortPasswortWiederholtValidator });

    this.agbGelesen = this.signUpForm.controls['agbGelesen'];
    this.email = this.signUpForm.controls['email'];
    this.passwort = this.signUpForm.controls['passwort'];
    this.passwortWdh = this.signUpForm.controls['passwortWdh'];
    this.kleber = this.signUpForm['kleber'];

    this.tooltipPasswort = AppConstants.tooltips.PASSWORTREGELN;
    this.showClientId = !environment.production;
  }

  ngOnInit() {
    this.clientInformation$ = this.appData.clientInformation$;
    this.redirectUrl$ = this.appData.redirectUrl$;

    this.loadClientInformation();

    this.redirectUrl$.pipe(
      filter(str => str.length > 0)
    ).subscribe(
      str => {
        this.redirectUrl = str;
        this.sendRedirect();
      }
    );

    this.clientInformation$.subscribe(
      info => {
        if (info.loginnameSupported) {
          this.signUpForm.addControl(
            'loginName', new FormControl('', [Validators.required, Validators.maxLength(255)])
          );
          this.loginName = this.signUpForm.controls['loginName'];
        }
      }
    );
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

  submitUser(): void {
    this.logger.debug('about to submit ' + this.signUpForm.value);

    this.messagesService.clear();

    const registrationCredentials: RegistrationCredentials = {
      agbGelesen: this.agbGelesen.value,
      clientCredentials: this.clientCredentials,
      email: this.email.value.trim(),
      kleber: this.kleber ? this.kleber.value : null,
      loginName: this.loginName ? this.loginName.value.trim() : null,
      passwort: this.passwort.value,
      passwortWdh: this.passwortWdh.value
    };

    this.logger.debug(JSON.stringify(registrationCredentials));

    this.userService.registerUser(registrationCredentials);
  }

  sendRedirect() {
    this.logger.debug('about to redirect to: ' + this.redirectUrl);
    window.location.href = this.redirectUrl;
  }

  cancel(): void {
    window.close();
  }
}


