import { Service, inject } from '@angular/core';
import { RaceService } from './race.service';

@Service()
export class BookmakerService {
  private raceService = inject(RaceService);
  readonly raceResults = this.raceService.raceResults;
}
