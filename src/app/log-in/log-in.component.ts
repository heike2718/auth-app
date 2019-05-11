import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClientInformation, ClientCredentials } from '../shared/model/client-information';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';
import { AppData } from '../shared/app-data.service';
import { MessagesService } from 'hewi-ng-lib';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { Logger } from '@nsalaun/ng-logger';
import { LoginCredentials } from '../shared/model/login-credentials';

@Component({
  selector: 'auth-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

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


  constructor(private fb: FormBuilder,
    private clientService: ClientService,
    private userService: UserService,
    private appData: AppData,
    private messagesService: MessagesService,
    private logger: Logger,
    private route: ActivatedRoute) { }

  ngOnInit() {
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

  }

  private sendRedirect() {
    this.logger.debug('about to redirect to: ' + this.redirectUrl);
    window.location.href = this.redirectUrl;
  }
}
