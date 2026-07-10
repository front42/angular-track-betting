import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./race-page/race-page.component').then((m) => m.RacePageComponent),
  },
  {
    path: 'winners',
    loadComponent: () => import('./winners-page/winners-page.component').then((m) => m.WinnersPageComponent),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
