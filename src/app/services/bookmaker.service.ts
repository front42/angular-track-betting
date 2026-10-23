import { Service, inject, signal } from '@angular/core';
import { RaceService } from './race.service';

@Service()
export class BookmakerService {
  private raceService = inject(RaceService);
  readonly raceResults = this.raceService.raceResults;

  private readonly _balance = signal<number>(10);
  readonly balance = this._balance.asReadonly();

  readonly isBankOpen = signal<boolean>(false);

  manageBank(): void {
    this.isBankOpen.set(!this.isBankOpen());
  }
}
