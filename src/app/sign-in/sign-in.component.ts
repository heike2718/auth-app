import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
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
import { MessagesService } from 'hewi-ng-lib';

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

  showDialog: boolean;

  private redirectUrl = '';


  constructor(private fb: FormBuilder,
    private clientService: ClientService,
    private userService: UserService,
    private appData: AppData,
    private modalService: ModalService,
    private messagesService: MessagesService,
    private logger: Logger,
    private route: ActivatedRoute) {

    this.signInForm = this.fb.group({
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
    this.showClientId = !environment.production;
  }

  ngOnInit() {
    this.showDialog = false;
    this.clientInformation$ = this.appData.clientInformation$;
    this.redirectUrl$ = this.appData.redirectUrl$;

    this.loadClientInformation();

    this.redirectUrl$.pipe(
      filter(str => str.length > 0)
    ).subscribe(
      str => {
        this.redirectUrl = str;
        this.openModal();
      }
    );

    this.clientInformation$.subscribe(
      info => {
        if (info.loginnameSupported)  {
          this.signInForm.addControl(
            'loginName', new FormControl('', [Validators.required, Validators.maxLength(255)])
          );
          this.loginName = this.signInForm.controls['loginName'];
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

  onClickOpenModal() {
    // tslint:disable-next-line:max-line-length
    this.redirectUrl = 'http://localhost:4200#accessToken=tAnBwn9ii3TK&expiresIn=0&tokenType=Bearer&state=signin&idToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI4OGU1NzNmMC03ODZhLTRiNDAtYTE0ZS1kZTMwYWFjM2I0NmQiLCJpc3MiOiJoZWlrZTI3MTgvYXV0aHByb3ZpZGVyIiwiZXhwIjoxNTQ2NjgyMTMyLCJpYXQiOjE1NDY2ODIxMzJ9.ATLalBOmYJG8fk2DSCfrhU2ss8Ah7nlWZway0G72lz7mfVTbpRfapj-a6rDimWh3pXuSQClIdodLcROg1PaxCal3-l_dHBsxwvhf2VGo7pmAN4cXdxKlI9jATEvRK-_nQaNVt-AxwYdM5Szkqo8HlBWMWZysjuVu_WYGXFv0IXMGkEWcMidKm4VgtTXBmFIiB7_y0l-DeTbAHORBStKkYrfwFUoNrBsARLZ54H4Ty4MUjXhZw829IzxO4cPtnUvwJBi7ZD06n7r2--C6V7acBQy50i6qa7_57W0ungDiPhMZIdO0K2f2-mN63_fvhjoWzQM320--pfUfswE69PSqew';
    this.openModal();
  }

  openModal(): void {
    this.showDialog = true;
    this.modalService.open();
  }

  submitUser(): void {
    this.logger.debug('about to submit ' + this.signInForm.value);

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

    this.userService.registerUser(registrationCredentials);
    // this.openModal();
  }

  closeModalAndSendRedirect() {
    this.modalService.close();
    this.logger.debug('about to redirect to: ' + this.redirectUrl);
    window.location.href = this.redirectUrl;
  }

  cancel(): void {
    window.close();
  }
}
