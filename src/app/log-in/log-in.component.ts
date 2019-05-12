import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClientInformation, ClientCredentials } from '../shared/model/client-information';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';
import { AppData } from '../shared/app-data.service';
import { MessagesService } from 'hewi-ng-lib';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Logger } from '@nsalaun/ng-logger';
import { LoginCredentials } from '../shared/model/login-credentials';
import { passwortValidator } from '../shared/validation/app.validators';

@Component({
  selector: 'auth-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {

  clientInformation$: Observable<ClientInformation>;

  redirectUrl$: Observable<string>;

  private clientCredentials: ClientCredentials;

  loginForm: FormGroup;

  loginName: AbstractControl;

  // TODO: loginName

  passwort: AbstractControl;

  kleber: AbstractControl;

  submitDisabled: true;

  showClientId: boolean;

  private redirectUrl = '';

  private redirectSubscription: Subscription;


  constructor(private fb: FormBuilder,
    private clientService: ClientService,
    private userService: UserService,
    private appData: AppData,
    private messagesService: MessagesService,
    private logger: Logger,
    private router: Router,
    private route: ActivatedRoute) {


    this.loginForm = this.fb.group({
      'loginName': ['', [Validators.required]],
      'passwort': ['', [Validators.required, passwortValidator]],
      'kleber': ['']
    });

    this.loginName = this.loginForm.controls['loginName'];
    this.passwort = this.loginForm.controls['passwort'];
    this.kleber = this.loginForm['kleber'];

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

  }

  ngOnDestroy() {
    if (this.redirectSubscription) {
      this.redirectSubscription.unsubscribe();
    }
  }

  private loadClientInformation() {
    let clientId = 'undefined';
    let redirectUrl = 'undefined';

    this.redirectSubscription = this.route.queryParams.pipe(
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

  submit(): void {
    this.logger.debug('about to submit ' + this.loginForm.value);

    this.messagesService.clear();

    const loginCredentials: LoginCredentials = {
      redirectUrl: '',
      loginName: this.loginName ? this.loginName.value.trim() : null,
      passwort: this.passwort.value,
      kleber: this.kleber ? this.kleber.value : null,
      clientCredentials: this.clientCredentials,
    };

    this.logger.debug(JSON.stringify(loginCredentials));

    this.userService.loginUser(loginCredentials);
  }

  gotoSignUp(): void {
    this.router.navigateByUrl('/signup');
  }

  private sendRedirect() {
    this.logger.debug('about to redirect to: ' + this.redirectUrl);
    window.location.href = this.redirectUrl;
  }
}
