import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { SearchComponent } from '../search/search.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];
