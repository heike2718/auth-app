import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { emailValidator, passwortValidator, passwortPasswortWiederholtValidator } from '../shared/validation/app.validators';
import { AppConstants } from '../shared/app.constants';
import { Logger } from '@nsalaun/ng-logger';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClientInformation, ClientCredentials, createQueryParameters, RegistrationCredentials, TwoPasswords } from '../shared/model/auth-model';
import { ClientService } from '../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { AppData } from '../shared/app-data.service';
import { MessagesService } from 'hewi-ng-lib';

@Component({
	selector: 'auth-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

	clientInformation$: Observable<ClientInformation>;

	redirectUrl$: Observable<string>;

	private clientCredentials: ClientCredentials;

	signUpForm: FormGroup;

	agbGelesen: AbstractControl;

	loginName: AbstractControl;

	vorname: AbstractControl;

	nachname: AbstractControl;

	email: AbstractControl;

	passwort: AbstractControl;

	passwortWdh: AbstractControl;

	kleber: AbstractControl;

	infoPasswortExpanded = false;

	tooltipPasswort: string;

	submitDisabled: true;

	showClientId: boolean;

	private redirectUrl = '';

	private redirectSubscription: Subscription;

	private clientInfoSubscription: Subscription;

	constructor(private fb: FormBuilder,
		private clientService: ClientService,
		private userService: UserService,
		private appData: AppData,
		private messagesService: MessagesService,
		private logger: Logger,
		private router: Router,
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

		this.redirectSubscription = this.redirectUrl$.pipe(
			filter(str => str.length > 0)
		).subscribe(
			str => {
				this.redirectUrl = str;
				this.sendRedirect();
			}
		);

		this.clientInfoSubscription = this.clientInformation$.subscribe(
			info => {
				if (info.loginnameSupported) {
					this.signUpForm.addControl(
						'loginName', new FormControl('', [Validators.required, Validators.maxLength(255)])
					);
					this.loginName = this.signUpForm.controls['loginName'];
				}
				if (info.namenRequired) {
					this.signUpForm.addControl(
						'vorname', new FormControl('', [Validators.required, Validators.maxLength(100)])
					);
					this.vorname = this.signUpForm.controls['vorname'];
					this.signUpForm.addControl(
						'nachname', new FormControl('', [Validators.required, Validators.maxLength(100)])
					);
					this.nachname = this.signUpForm.controls['nachname'];
				}
			}
		);
	}

	ngOnDestroy() {
		if (this.redirectSubscription) {
			this.redirectSubscription.unsubscribe();
		}
		if (this.clientInfoSubscription) {
			this.clientInfoSubscription.unsubscribe();
		}
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

		const twoPasswords: TwoPasswords = {
			passwort: this.passwort.value,
			passwortWdh: this.passwortWdh.value
		}

		const registrationCredentials: RegistrationCredentials = {
			agbGelesen: this.agbGelesen.value,
			clientCredentials: this.clientCredentials,
			email: this.email.value.trim(),
			kleber: this.kleber ? this.kleber.value : null,
			vorname: this.vorname ? this.vorname.value.trim() : null,
			nachname: this.nachname ? this.nachname.value.trim() : null,
			// wenn man den loginnamen nicht setzen kann, wird die Mailadresse verwendet.
			loginName: this.loginName ? this.loginName.value.trim() : this.email.value.trim(),
			twoPasswords: twoPasswords
		};

		this.logger.debug(JSON.stringify(registrationCredentials));

		this.userService.registerUser(registrationCredentials);
	}

	gotoLogin(): void {
		let url = '/login';
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
