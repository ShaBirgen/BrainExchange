import { Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LandingComponent } from './Components/landing/landing.component';
import { FooterComponent } from './Components/footer/footer.component';
import { UsersDashboardComponent } from './Components/users-dashboard/users-dashboard.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UsersDashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'footer', component: FooterComponent },
];
    ;
