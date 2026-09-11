import { Component, computed, input, signal, ElementRef, inject, effect } from '@angular/core';
import { RacePhase } from '../../services/race.service';

const RACER_WIDTH = 55;
const TRACK_START_OFFSET_LEFT = 152;
const TRACK_FINISH_OFFSET_RIGHT = 115;
const TOTAL_PIXEL_COMPENSATION = TRACK_START_OFFSET_LEFT + TRACK_FINISH_OFFSET_RIGHT;

@Component({
  selector: 'app-track',
  imports: [],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent {
  phase = input.required<RacePhase>();

  name = input.required<string>();
  fill = input.required<string>();
  progress = input.required<number>();
  duration = input<string>();
  timingFn = input<string>();

  private hostElement = inject(ElementRef<HTMLElement>).nativeElement;
  private trackWidth = signal<number>(0);

  protected styleLeft = computed(() => {
    const p = this.progress();
    return `calc(${TRACK_START_OFFSET_LEFT}px + ${p}% - ${(p / 100) * TOTAL_PIXEL_COMPENSATION}px)`;
  });

  protected rotationAngle = computed(() => {
    const p = this.progress();
    const width = this.trackWidth();
    if (width === 0) return 0;

    const clearDistance = width - TOTAL_PIXEL_COMPENSATION;
    const passedDistance = (p / 100) * clearDistance;
    const racerCircumference = Math.PI * RACER_WIDTH;

    return (passedDistance / racerCircumference) * 360;
  });

  protected isRacerFinished = computed(() => {
    if (this.phase() !== 'racing') return false;
    return this.progress() === 100 && this.duration() === '0s'; // duration reset in race-service
  });

  constructor() {
    effect((onCleanup) => {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          this.trackWidth.set(entry.contentRect.width);
        }
      });

      observer.observe(this.hostElement);
      onCleanup(() => observer.disconnect());
    });
  }

  protected showRacerCard() {
    console.log(`${this.name()}'s card is displayed.`);
  }
}
