import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';

export const routerConfig: Routes = [
    // {
    //     path: 'home',
    //     component: HomeComponent
    // },
    // {
    //     path: 'login',
    //     component: LoginComponent
    // },
    {
        path: 'signin',
        component: SignInComponent
    },
    // {
    //     path: 'checkliste/configuration/:kuerzel',
    //     component: ConfigureChecklisteComponent,
    //     resolve: {
    //         detail: ConfigureChecklisteResolver
    //     }
    // },
    // {
    //     path: 'checkliste/execution/:kuerzel',
    //     component: ExecuteChecklisteComponent,
    //     resolve: {
    //         detail: ExecuteChecklisteResolver
    //     }
    // },
    // {
    //     path: 'error',
    //     component: ErrorComponent
    // },
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


