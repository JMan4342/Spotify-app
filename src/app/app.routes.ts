import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { SearchComponent } from '../search/search.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: UserProfileComponent },
];
