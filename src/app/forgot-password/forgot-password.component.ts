import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { TempPasswordCredentials } from '../shared/model/temp-pwd-payloads';
import { TempPasswordService } from '../services/temp-password.service';
import { Logger } from '@nsalaun/ng-logger';
import { HttpErrorService } from '../error/http-error.service';
import { MessagesService } from 'hewi-ng-lib';

@Component({
	selector: 'auth-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {


	orderPwdForm: FormGroup;

	email: AbstractControl;

	kleber: AbstractControl;

	showMessage: boolean;

	message: string;

	constructor(private fb: FormBuilder
		, private tempPwdService: TempPasswordService
		, private httpErrorService: HttpErrorService
		, private messagesService: MessagesService
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


	submit(): void {

		const _email = this.email.value ? this.email.value.trim() : null;
		const _kleber = this.kleber.value ? this.kleber.value : null;

		const tempPasswordCredentials: TempPasswordCredentials = {
			'email': _email,
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
