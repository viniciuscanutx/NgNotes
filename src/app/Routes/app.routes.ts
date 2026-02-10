import { Routes } from '@angular/router';
import { Home } from '../Pages/home/home';
import { Tags } from '../Pages/tags/tags';
import { Settings } from '../Pages/settings/settings';
import { Login } from '../Pages/login/login';
import { MainLayout } from '../Layout/Main-Layout/mainLayout';
import { authGuard, redirectIfLoggedIn } from '../Guards/authGuard';
import { SharedCards } from '../Pages/shared-cards/shared-cards';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Login, canActivate: [redirectIfLoggedIn] },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'tags', component: Tags },
      { path: 'shared', component: SharedCards },
      { path: 'settings', component: Settings },
    ]
  }
];
