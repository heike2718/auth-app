import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';

export const routerConfig: Routes = [
     {
        path: 'signin',
        component: SignInComponent
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


