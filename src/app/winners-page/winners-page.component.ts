import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { BookmakerService } from '../services/bookmaker.service';

@Component({
  selector: 'app-winners-page',
  imports: [NgOptimizedImage],
  templateUrl: './winners-page.component.html',
  styleUrl: './winners-page.component.scss',
})
export class WinnersPageComponent {
  private bookmakerService = inject(BookmakerService);
  protected podium = this.bookmakerService.raceResults;
}
