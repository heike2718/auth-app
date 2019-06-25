import { Component } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { TempPasswordCredentials } from '../shared/model/temp-pwd-payloads';
import { TempPasswordService } from '../services/temp-password.service';

@Component({
	selector: 'auth-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {


	orderPwdForm: FormGroup;

	email: AbstractControl;

	kleber: AbstractControl;

	submitDisabled: true;

	constructor(private fb: FormBuilder,
		private tempPwdService: TempPasswordService) {

		this.orderPwdForm = this.fb.group({
			'email': ['', [Validators.required]],
			'kleber': ['']
		});

		this.email = this.orderPwdForm.controls['email'];
		this.kleber = this.orderPwdForm.controls['kleber'];

	}


	submit(): void {

		const tempPasswordCredentials: TempPasswordCredentials = {
			email: this.email ? this.email.value().trim() : null,
			kleber: this.kleber ? this.kleber.value : null
		};


		this.tempPwdService.requestTempPassword(tempPasswordCredentials);

	}

}
