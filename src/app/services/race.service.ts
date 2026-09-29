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
  private finishedOrder: Racer[] = [];
  private activeTimeouts: ReturnType<typeof setTimeout>[] = [];
  private readonly durations = [4, 5, 6, 7, 8];
  private readonly timingFns = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];

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

    const updatedRacers = this._racers().map((racer, index) => ({
      ...racer,
      progress: 100,
      duration: `${shuffledDurations[index]}s`,
      timingFn: shuffledTimingFns[index],
    }));

    this._racers.set(updatedRacers);

    updatedRacers.forEach((racer) => {
      const durationSeconds = parseFloat(racer.duration);

      const timeoutId = setTimeout(() => this.handleRacerFinish(racer), durationSeconds * 1000);
      this.activeTimeouts.push(timeoutId);
    });
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

  private handleRacerFinish(finishedRacer: Racer): void {
    this.finishedOrder.push(finishedRacer);

    this._racers.update((currentRacers) =>
      currentRacers.map((racer) =>
        racer.id === finishedRacer.id ? { ...racer, duration: '0s', timingFn: 'linear' } : racer,
      ),
    );

    if (this.finishedOrder.length === this._racers().length) {
      this.clearAllTimeouts();

      const finishDelay = setTimeout(() => this._phase.set('finished'), TAIL_WAG_HI_DURATION_MS);
      this.activeTimeouts.push(finishDelay);
    }
  }

  private clearAllTimeouts(): void {
    this.activeTimeouts.forEach((timeout) => clearTimeout(timeout));
    this.activeTimeouts = [];
  }
}
