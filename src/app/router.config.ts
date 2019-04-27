import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorComponent } from './error/error.component';

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


