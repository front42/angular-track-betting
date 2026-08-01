import { Service, signal } from '@angular/core';
import { Racer } from '../models/racer.model';

export type RacePhase = 'ready' | 'racing' | 'finished' | 'returning';

@Service()
export class RaceService {
  private readonly _racers = signal<Racer[]>([
    { id: 1, name: 'Mr. White', fill: '#ffffff' },
    { id: 2, name: 'Mr. Blonde', fill: '#ffeeb5' },
    { id: 3, name: 'Mr. Pink', fill: '#ff8da1' },
    { id: 4, name: 'Mr. Brown', fill: '#d87040' },
    { id: 5, name: 'Mr. Blue', fill: '#3673c4' },
  ]);
  readonly racers = this._racers.asReadonly();

  private readonly _phase = signal<RacePhase>('ready');
  readonly phase = this._phase.asReadonly();

  startRace(): void {
    if (this._phase() !== 'ready') return;

    this._phase.set('racing');
    setTimeout(() => this._phase.set('finished'), 2000);
  }

  returnHome(): void {
    if (this._phase() !== 'finished') return;

    this._phase.set('returning');
    setTimeout(() => this._phase.set('ready'), 2000);
  }
}
