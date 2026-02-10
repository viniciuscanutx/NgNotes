import { Routes } from '@angular/router';
import { Home } from '../Pages/home/home';
import { Tags } from '../Pages/tags/tags';
import { Settings } from '../Pages/settings/settings';
import { Shared } from '../Pages/shared/shared';
import { Login } from '../Pages/login/login';
import { MainLayout } from '../Layout/Main-Layout/mainLayout';
import { authGuard } from '../Guards/authGuard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Login },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'tags', component: Tags },
      { path: 'shared', component: Shared },
      { path: 'settings', component: Settings },
    ]
  }
];
