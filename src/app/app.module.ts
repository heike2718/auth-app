import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routerConfig } from './router.config';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormErrorComponent } from './shared/components/form-error/form-error.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { ModalOpenOnClickDirective } from './shared/components/modal/modal-open-on-click.directive';
import { HewiNgLibModule } from 'hewi-ng-lib';


import { NgLoggerModule, Level } from '@nsalaun/ng-logger';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';

// Set different log level depending on environment.
let LOG_LEVEL = Level.ERROR;
if (!environment.production) {
  LOG_LEVEL = Level.DEBUG;
}


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    FormErrorComponent,
    ModalComponent,
    ModalOpenOnClickDirective,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routerConfig),
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HewiNgLibModule,
    NgLoggerModule.forRoot(LOG_LEVEL),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
