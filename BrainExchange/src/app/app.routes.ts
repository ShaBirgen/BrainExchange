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
import { HomeComponent } from './Components/home/home.component';
import { UserSpecialistViewComponent } from './Components/user-specialist-view/user-specialist-view.component';
import { AdminCategoriesViewComponent } from './Components/Admin/admin-categories-view/admin-categories-view.component';
import { AdminSpecialistsViewComponent } from './Components/Admin/admin-specialists-view/admin-specialists-view.component';
import { CreateCategoryComponent } from './Components/Admin/create-category/create-category.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UsersDashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'specialist', component: SpecialistDashboardComponent },
  { path: 'update', component: UpdateProfileComponent },
  { path: 'role/:id', component: RolesComponent },
  { path: 'More-info/:id', component: SpecialistInfoComponent },
  { path: 'Categories', component: HomeComponent },
  { path: 'specialists', component: UserSpecialistViewComponent },
  { path: 'footer', component: FooterComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    children: [
      { path: 'users-view', component: AdminUserViewComponent },
      { path: 'categories-view', component: AdminCategoriesViewComponent },
      { path: 'specialist-view', component: AdminSpecialistsViewComponent },
      { path: 'createCategory', component: CreateCategoryComponent },
    ],
  },
  { path: '**', component: WildcardComponent },
];
    ;
