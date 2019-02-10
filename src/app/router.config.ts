import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routerConfig: Routes = [
     {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
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


