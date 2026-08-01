import { Component, inject } from '@angular/core';
import { TrackComponent } from './track/track.component';
import { RaceService } from '../services/race.service';

@Component({
  selector: 'app-race-page',
  imports: [TrackComponent],
  templateUrl: './race-page.component.html',
  styleUrl: './race-page.component.scss',
})
export class RacePageComponent {
  private raceService = inject(RaceService);
  protected racers = this.raceService.racers;
}
