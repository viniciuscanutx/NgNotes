import { Routes } from '@angular/router';
import { Home } from '../Pages/home/home';
import { Tags } from '../Pages/tags/tags';
import { Settings } from '../Pages/settings/settings';
import { Shared } from '../Pages/shared/shared';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'tags', component: Tags },
  { path: 'shared', component: Shared },
  { path: 'settings', component: Settings },
];
