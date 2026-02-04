import { Routes } from '@angular/router';
import { Home } from '../Pages/home/home';
import { Notes } from '../Pages/notes/notes';
import { Settings } from '../Pages/settings/settings';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Home },
  { path: 'notes', component: Notes },
  { path: 'settings', component: Settings },
];
