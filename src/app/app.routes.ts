import { Routes } from '@angular/router';
import { RacePageComponent } from './race-page/race-page.component';
import { WinnersPageComponent } from './winners-page/winners-page.component';

export const routes: Routes = [
  { path: '', component: RacePageComponent },
  { path: 'winners', component: WinnersPageComponent },
  { path: '**', redirectTo: '/' },
];
