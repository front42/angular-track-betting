import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { RaceService } from '../../services/race.service';

interface ActionButtonMode {
  type: 'start' | 'home' | 'bank';
  text: string;
  color: string;
}

@Component({
  selector: 'app-action-button',
  imports: [],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.scss',
})
export class ActionButtonComponent {
  private router = inject(Router);
  private raceService = inject(RaceService);

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  private isWinnersPage = computed(() => this.currentUrl().includes('winners'));

  private racePhase = this.raceService.phase;

  protected currentMode = computed<ActionButtonMode>(() => {
    if (this.isWinnersPage()) {
      return { type: 'bank', text: 'Bank', color: 'var(--money-color)' };
    }

    const phase = this.racePhase();
    if (phase === 'finished' || phase === 'returning') {
      return { type: 'home', text: 'Home', color: 'darkred' };
    }

    return { type: 'start', text: 'Start', color: 'darkred' };
  });

  protected isDisabled = computed(() => {
    const mode = this.currentMode();
    const phase = this.racePhase();
    return (mode.type === 'start' && phase === 'racing') || (mode.type === 'home' && phase === 'returning');
  });

  protected handleClick(type: ActionButtonMode['type']) {
    if (type === 'start') this.raceService.startRace();
    if (type === 'home') this.raceService.returnHome();
    if (type === 'bank') console.log('Your balance: 100 candies.');
  }
}
