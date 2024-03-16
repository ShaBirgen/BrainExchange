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
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { AdminUserViewComponent } from './Components/Admin/admin-user-view/admin-user-view.component';
import { AdminDashboardComponent } from './Components/Admin/admin-dashboard/admin-dashboard.component';
import { RolesComponent } from './Components/roles/roles.component';
import { SpecialistInfoComponent } from './Components/specialist-info/specialist-info.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UsersDashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'specialist', component: SpecialistDashboardComponent },
  { path: 'update', component: UpdateProfileComponent },
  { path: 'User-role', component: RolesComponent },
  { path: 'More-info', component: SpecialistInfoComponent },
  { path: 'footer', component: FooterComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [{ path: 'users-view', component: AdminUserViewComponent }],
  },
  { path: '**', component: WildcardComponent },
];
    ;
