import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClientInformation, ClientCredentials, LoginCredentials, AuthorizationCredentials } from '../shared/model/auth-model';
import { createQueryParameters } from '../shared/model/auth-model';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';
import { AppData } from '../shared/app-data.service';
import { MessagesService, LogService } from 'hewi-ng-lib';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
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

	passwort: AbstractControl;

	kleber: AbstractControl;

	showClientId: boolean;

	private redirectUrl = '';

	private redirectSubscription: Subscription;


	constructor(private fb: FormBuilder,
		private clientService: ClientService,
		private userService: UserService,
		private appData: AppData,
		private messagesService: MessagesService,
		private logger: LogService,
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

		this.redirectSubscription = this.route.queryParams.pipe(
			filter(params => params.clientId || params.redirectUrl)
		).subscribe(
			params => {
				this.clientCredentials = {
					accessToken: params.accessToken,
					redirectUrl: params.redirectUrl,
					state: params.state
				};
				this.appData.updateClientCredentials(this.clientCredentials);
				this.clientService.getClient(this.clientCredentials);
			}
		);
	}

	submit(): void {
		this.logger.debug('about to submit ' + this.loginForm.value);

		this.messagesService.clear();

		const authCredentials: AuthorizationCredentials = {
			loginName: this.loginName ? this.loginName.value.trim() : null,
			passwort: this.passwort.value,
			kleber: this.kleber ? this.kleber.value : null
		};

		const loginCredentials: LoginCredentials = {
			authorizationCredentials: authCredentials,
			clientCredentials: this.clientCredentials,
		};

		this.logger.debug(JSON.stringify(loginCredentials));

		this.userService.loginUser(loginCredentials);
	}

	gotoOrderTempPwd(): void {
		this.router.navigateByUrl('password/temp/order');
	}

	gotoSignUp(): void {
		let url = '/signup';
		if (this.clientCredentials) {
			url += createQueryParameters(this.clientCredentials);
		}
		this.router.navigateByUrl(url);
	}

	private sendRedirect() {
		this.logger.debug('about to redirect to: ' + this.redirectUrl);
		window.location.href = this.redirectUrl;
	}
}

