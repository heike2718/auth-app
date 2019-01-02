import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routerConfig } from './router.config';
import { SignInComponent } from './sign-in/sign-in.component';
import { MessagesComponent } from './messages/messages.component';
import { FormErrorComponent } from './shared/components/form-error/form-error.component';

import {NgLoggerModule, Level} from '@nsalaun/ng-logger';
import { environment } from '../environments/environment';

// Set different log level depending on environment.
let LOG_LEVEL = Level.ERROR;
if (!environment.production) {
  LOG_LEVEL = Level.DEBUG;
}


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    MessagesComponent,
    FormErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routerConfig),
    FormsModule,
    ReactiveFormsModule,
    NgLoggerModule.forRoot(LOG_LEVEL),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
