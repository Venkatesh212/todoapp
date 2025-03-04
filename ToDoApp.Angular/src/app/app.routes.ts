import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActiveComponent } from './components/active/active.component';
import { CompletedComponent } from './components/completed/completed.component';
import { authguardGuard } from './authguard/authguard.guard';

export const routes: Routes = [
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    {
        path: 'main', component: MainComponent,canActivate: [authguardGuard] ,
        children: [
            { path: 'dashboard', component: DashboardComponent},
            { path: 'active', component: ActiveComponent },
            { path: 'completed',component: CompletedComponent},
            { path : '', component: DashboardComponent},
            { path: '',   redirectTo: '/main', pathMatch: 'full' },
        ]
       },
    { path: '', component: SignInComponent }
];
