import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { RaceService } from './services/race.service';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./race-page/race-page.component').then((m) => m.RacePageComponent),
    canDeactivate: [
      () => {
        const phase = inject(RaceService).phase();
        if (phase === 'racing') {
          alert(`🚨 Hey, Mafia doesn't like jokes! You can't just run off in the middle of the race!`);
          return false;
        }
        return true;
      },
    ],
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
