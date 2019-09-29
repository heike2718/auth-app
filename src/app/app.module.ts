import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { routerConfig } from './router.config';
import { GlobalErrorHandler } from './error/global-error-handler.service';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormErrorComponent } from './shared/components/form-error/form-error.component';
import { HewiNgLibModule } from 'hewi-ng-lib';


import { NgLoggerModule, Level } from '@nsalaun/ng-logger';
import { environment } from '../environments/environment';
import { TempPasswordComponent } from './temp-password/temp-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';

// Set different log level depending on environment.
let LOG_LEVEL = Level.ERROR;
if (!environment.production) {
	LOG_LEVEL = Level.DEBUG;
}


@NgModule({
	declarations: [
		AppComponent,
		FormErrorComponent,
		SignUpComponent,
		LogInComponent,
		ErrorComponent,
		TempPasswordComponent,
		ForgotPasswordComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		RouterModule.forRoot(routerConfig, { useHash: true }),
		FormsModule,
		HttpClientModule,
		NgbModule,
		ReactiveFormsModule,
		HewiNgLibModule,
		NgLoggerModule.forRoot(LOG_LEVEL),
	],
	providers: [
		GlobalErrorHandler,
		{ provide: ErrorHandler, useClass: GlobalErrorHandler }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

