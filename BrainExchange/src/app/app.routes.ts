import { Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LandingComponent } from './Components/landing/landing.component';
import { FooterComponent } from './Components/footer/footer.component';
import { UsersDashboardComponent } from './Components/users-dashboard/users-dashboard.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { AdminSidebarComponent } from './Components/Admin/admin-sidebar/admin-sidebar.component';
import { SpecialistDashboardComponent } from './Components/specialist-dashboard/specialist-dashboard.component';
import { WildcardComponent } from './Components/wildcard/wildcard.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UsersDashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'specialist', component: SpecialistDashboardComponent },
  { path: 'admin-sidebar', component: AdminSidebarComponent },
  { path: 'footer', component: FooterComponent },
  { path: '**', component: WildcardComponent },
];
    ;
