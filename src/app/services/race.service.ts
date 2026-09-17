import { DestroyRef, Service, inject, signal } from '@angular/core';
import { Racer } from '../models/racer.model';

export type RacePhase = 'ready' | 'racing' | 'finished' | 'returning';

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// track.component.scss durations:
const TAIL_WAG_HI_DURATION_MS = 1200;
const RETURNING_DURATION_MS = 4000;

@Service()
export class RaceService {
  private destroyRef = inject(DestroyRef);
  private finishedOrder: number[] = [];
  private activeTimeouts: ReturnType<typeof setTimeout>[] = [];

  private readonly _racers = signal<Racer[]>([
    { id: 1, name: 'Mr. White', fill: '#ffffff', progress: 0, duration: '0s', timingFn: 'linear' },
    { id: 2, name: 'Mr. Blonde', fill: '#ffeeb5', progress: 0, duration: '0s', timingFn: 'linear' },
    { id: 3, name: 'Mr. Pink', fill: '#ff8da1', progress: 0, duration: '0s', timingFn: 'linear' },
    { id: 4, name: 'Mr. Brown', fill: '#d87040', progress: 0, duration: '0s', timingFn: 'linear' },
    { id: 5, name: 'Mr. Blue', fill: '#3673c4', progress: 0, duration: '0s', timingFn: 'linear' },
  ]);
  readonly racers = this._racers.asReadonly();

  private readonly _phase = signal<RacePhase>('ready');
  readonly phase = this._phase.asReadonly();

  private readonly durations = [4, 5, 6, 7, 8];
  private readonly timingFns = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];

  constructor() {
    this.destroyRef.onDestroy(() => this.clearAllTimeouts());
  }

  startRace(): void {
    if (this._phase() !== 'ready') return;
    this._phase.set('racing');
    this.finishedOrder = [];
    this.clearAllTimeouts();

    const shuffledDurations = shuffle(this.durations);
    const shuffledTimingFns = shuffle(this.timingFns);

    this._racers.update((currentRacers) => {
      return currentRacers.map((racer, index) => {
        const duration = shuffledDurations[index];
        const timingFn = shuffledTimingFns[index];

        const timeoutId = setTimeout(() => {
          this.handleRacerFinish(racer.id);
        }, duration * 1000);
        this.activeTimeouts.push(timeoutId);

        return {
          ...racer,
          progress: 100,
          duration: `${duration}s`,
          timingFn,
        };
      });
    });
  }

  private handleRacerFinish(racerId: number): void {
    this.finishedOrder.push(racerId);

    this._racers.update((currentRacers) =>
      currentRacers.map((racer) => (racer.id === racerId ? { ...racer, duration: '0s', timingFn: 'linear' } : racer)),
    );

    if (this.finishedOrder.length === this._racers().length) {
      this.clearAllTimeouts();
      this.handleRaceResults(this.finishedOrder);

      const finishDelay = setTimeout(() => {
        this._phase.set('finished');
      }, TAIL_WAG_HI_DURATION_MS);
      this.activeTimeouts.push(finishDelay);
    }
  }

  returnHome(): void {
    if (this._phase() !== 'finished') return;
    this._phase.set('returning');
    this.clearAllTimeouts();

    this._racers.update((currentRacers) => currentRacers.map((racer) => ({ ...racer, progress: 0 })));

    const homeTimeout = setTimeout(() => {
      this._phase.set('ready');
    }, RETURNING_DURATION_MS);
    this.activeTimeouts.push(homeTimeout);
  }

  private clearAllTimeouts(): void {
    this.activeTimeouts.forEach((t) => clearTimeout(t));
    this.activeTimeouts = [];
  }

  private handleRaceResults(order: number[]): void {
    console.log(`🏁 Final Mafia's Race Results:`, order);
  }
}
