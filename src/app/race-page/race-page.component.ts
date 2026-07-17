import { Component, signal } from '@angular/core';
import { TrackComponent } from './track/track.component';
import { Racer } from '../models/racer.model';

@Component({
  selector: 'app-race-page',
  imports: [TrackComponent],
  templateUrl: './race-page.component.html',
  styleUrl: './race-page.component.scss',
})
export class RacePageComponent {
  protected readonly racers = signal<Racer[]>([
    { id: 1, name: 'Mr. White', fill: '#ffffff' },
    { id: 2, name: 'Mr. Blonde', fill: '#ffeeb5' },
    { id: 3, name: 'Mr. Pink', fill: '#ff8da1' },
    { id: 4, name: 'Mr. Brown', fill: '#d87040' },
    { id: 5, name: 'Mr. Blue', fill: '#3673c4' },
  ]).asReadonly();
}
