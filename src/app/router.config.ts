import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';
import { TempPasswordComponent } from './temp-password/temp-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routerConfig: Routes = [
	{
		path: 'login',
		component: LogInComponent
	},
	{
		path: 'signup',
		component: SignUpComponent
	},
	{
		path: 'password/temp/order',
		component: ForgotPasswordComponent
	},
	{
		path: 'password/temp/change',
		component: TempPasswordComponent
	},
	{
		path: 'error',
		component: ErrorComponent
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/'
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: '/'
	}
];

