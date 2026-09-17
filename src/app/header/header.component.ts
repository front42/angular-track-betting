import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActionButtonComponent } from './action-button/action-button.component';
import { RaceService } from '../services/race.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ActionButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private raceService = inject(RaceService);
  protected racePhase = this.raceService.phase;
}
