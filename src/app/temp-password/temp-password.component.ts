import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { emailValidator, passwortValidator, passwortPasswortWiederholtValidator } from '../shared/validation/app.validators';
import { AppConstants } from '../shared/app.constants';
import { TempPasswordService } from '../services/temp-password.service';
import { HttpErrorService } from '../error/http-error.service';
import { MessagesService, LogService } from 'hewi-ng-lib';
import { ChangeTempPasswordPayload, ClientInformation, TwoPasswords } from '../shared/model/auth-model';

@Component({
	selector: 'auth-temp-password',
	templateUrl: './temp-password.component.html',
	styleUrls: ['./temp-password.component.css']
})
export class TempPasswordComponent implements OnInit, OnDestroy {

	queryParams$: Observable<Params>;

	private tokenId: string;

	private clientInformation: ClientInformation;

	changePwdForm: FormGroup;

	email: AbstractControl;

	tempPassword: AbstractControl;

	passwort: AbstractControl;

	passwortWdh: AbstractControl;

	tooltipPasswort: string;

	submitDisabled: true;

	showChangePasswordResult: boolean;

	message: string;

	zurueckText: string;

	private queryParamsSubscription: Subscription;

	constructor(private fb: FormBuilder,
		private logger: LogService,
		private tempPwdService: TempPasswordService,
		private httpErrorService: HttpErrorService,
		private messagesService: MessagesService,
		private route: ActivatedRoute,
		private router: Router) {


		this.tooltipPasswort = AppConstants.tooltips.PASSWORTREGELN;
		this.tokenId = 'undefined';
		this.showChangePasswordResult = false;
		this.message = '';
		this.zurueckText = 'zurück';

		this.changePwdForm = this.fb.group({
			'email': ['', [Validators.required, emailValidator]],
			'tempPassword': ['', [Validators.required]],
			'passwort': ['', [Validators.required, passwortValidator]],
			'passwortWdh': ['', [Validators.required, passwortValidator]]
		}, { validator: passwortPasswortWiederholtValidator });

		this.email = this.changePwdForm.controls['email'];
		this.tempPassword = this.changePwdForm.controls['tempPassword'];
		this.passwort = this.changePwdForm.controls['passwort'];
		this.passwortWdh = this.changePwdForm.controls['passwortWdh'];
	}

	ngOnInit() {

		this.queryParams$ = this.route.queryParams;

		this.queryParamsSubscription = this.queryParams$.pipe(
			filter(params => params.tokenId)
		).subscribe(
			params => {
				this.tokenId = params.tokenId;

				if (!this.tokenId || this.tokenId === 'undefined') {
					this.showChangePasswordResult = true;
					// tslint:disable-next-line:max-line-length
					this.message = 'Der aufgerufene Link ist ungültig. Bitte kopieren Sie den Link vollständig oder klicken Sie ihn nochmals an. Falls das nicht hilft, senden Sie bitte eine Mail an mathe@egladil.de.';
				}
			}
		);
	}


	ngOnDestroy() {
		if (this.queryParamsSubscription) {
			this.queryParamsSubscription.unsubscribe();
		}
	}


	submit() {

		const _email = this.email.value ? this.email.value.trim() : null;
		const _tempPassword = this.tempPassword.value ? this.tempPassword.value.trim() : null;

		const _twoPasswords: TwoPasswords = {
			'passwort': this.passwort.value,
			'passwortWdh': this.passwortWdh.value
		};

		const credentials: ChangeTempPasswordPayload = {
			'tokenId': this.tokenId,
			'tempPassword': _tempPassword,
			'email': _email,
			'twoPasswords': _twoPasswords

		};

		const response$ = this.tempPwdService.changeTempPassword(credentials);

		response$.subscribe(
			payload => {
				const level = payload.message.level;

				if (level === 'INFO') {
					this.showChangePasswordResult = true;
					if (payload.data) {
						this.clientInformation = payload.data;
						this.zurueckText = this.clientInformation.zurueckText;
					}

				} else {
					this.showChangePasswordResult = false;
					this.messagesService.error(payload.message.message);
					this.message = '';
				}

			},
			error => this.httpErrorService.handleError(error, 'orderTempPassword', undefined),
			() => this.logger.debug('post call completed')
		);
	}

	canRedirect(): boolean {
		return this.clientInformation !== undefined;
	}

	closeModal(): void {
		this.showChangePasswordResult = false;
		if (this.canRedirect()) {
			this.sendRedirect();
		} else {
			this.router.navigateByUrl('/home');
		}
	}


	private sendRedirect(): void {
		window.location.href = this.clientInformation.baseUrl;
	}
}

