import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

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

  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  private isWinnersPage = computed(() => this.currentUrl().includes('winners'));

  protected isRaceOn = signal(false);
  protected isRaceOver = signal(false);
  protected isGoingHome = signal(false);

  protected currentMode = computed<ActionButtonMode>(() => {
    if (this.isWinnersPage()) {
      return { type: 'bank', text: 'Bank', color: 'var(--money-color)' };
    }

    if (this.isRaceOver()) {
      return { type: 'home', text: 'Home', color: 'darkred' };
    }

    return { type: 'start', text: 'Start', color: 'darkred' };
  });

  protected handleClick(type: ActionButtonMode['type']) {
    switch (type) {
      case 'start':
        this.isRaceOn.set(true);
        setTimeout(() => {
          this.isRaceOver.set(true);
        }, 2000);
        break;
      case 'home':
        this.isGoingHome.set(true);
        setTimeout(() => {
          this.isRaceOn.set(false);
          this.isRaceOver.set(false);
          this.isGoingHome.set(false);
        }, 2000);
        break;
      case 'bank':
        console.log('Your balance: 100 candies.');
        break;
    }
  }
}
