import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { TempPasswordCredentials, ClientCredentials } from '../shared/model/auth-model';
import { TempPasswordService } from '../services/temp-password.service';
import { Logger } from '@nsalaun/ng-logger';
import { HttpErrorService } from '../error/http-error.service';
import { MessagesService } from 'hewi-ng-lib';
import { AppData } from '../shared/app-data.service';

@Component({
	selector: 'auth-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


	orderPwdForm: FormGroup;

	email: AbstractControl;

	kleber: AbstractControl;

	showMessage: boolean;

	message: string;

	private clientCredentials: ClientCredentials;

	constructor(private fb: FormBuilder
		, private tempPwdService: TempPasswordService
		, private httpErrorService: HttpErrorService
		, private messagesService: MessagesService
		, private appData: AppData
		, private logger: Logger) {

		this.orderPwdForm = this.fb.group({
			'email': ['', [Validators.required]],
			'kleber': ['']
		});

		this.email = this.orderPwdForm.controls['email'];
		this.kleber = this.orderPwdForm.controls['kleber'];

		this.showMessage = false;
		this.message = '';
	}

	ngOnInit() {
		this.clientCredentials = this.appData.clientCredentialsSubject.getValue();
	}


	submit(): void {

		const _email = this.email.value ? this.email.value.trim() : null;
		const _kleber = this.kleber.value ? this.kleber.value : null;

		let _clientCreds = this.clientCredentials;
		if (!this.clientCredentials || this.clientCredentials.clientId === 'undefined') {
			_clientCreds = null;
		}

		const tempPasswordCredentials: TempPasswordCredentials = {
			'email': _email,
			'clientCredentials': _clientCreds,
			'kleber': _kleber
		};

		this.logger.debug(JSON.stringify(tempPasswordCredentials));
		const response$ = this.tempPwdService.orderTempPassword(tempPasswordCredentials);

		response$.subscribe(
			payload => {
				const level = payload.message.level;

				if (level === 'INFO') {
					this.showMessage = true;
					this.message = payload.message.message;
				} else {
					this.showMessage = false;
					this.messagesService.error(payload.message.message);
					this.message = '';
				}

			},
			error => this.httpErrorService.handleError(error, 'orderTempPassword'),
			() => this.logger.debug('post call completed')
		);
	}
}
