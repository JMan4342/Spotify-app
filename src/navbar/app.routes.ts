import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from './navbar.component';
import { HomeComponent } from '../home/home.component';
import { SearchComponent } from '../search/search.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { authorizationGuard } from '../authorization.guard';

export const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent, canActivate: [authorizationGuard] },
  // { path: 'user-profile', component: UserProfileComponent, canActivate: [authorizationGuard] },
  // { path: 'search', component: SearchComponent, canActivate: [authorizationGuard] },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', component: HomeComponent, canActivate: [authorizationGuard] },
  {
    path: '',
    component: NavbarComponent,
    canActivate: [authorizationGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: 'search', component: SearchComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent, canActivate: [authorizationGuard] }
];
