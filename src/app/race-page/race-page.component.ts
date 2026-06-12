import { Component } from '@angular/core';
import { TrackComponent } from './track/track.component';

@Component({
  selector: 'app-race-page',
  imports: [TrackComponent],
  templateUrl: './race-page.component.html',
  styleUrl: './race-page.component.scss',
})
export class RacePageComponent {}
