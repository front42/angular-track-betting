import { Component, OnInit, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { BookmakerService } from '../services/bookmaker.service';

@Component({
  selector: 'app-winners-page',
  imports: [NgOptimizedImage],
  templateUrl: './winners-page.component.html',
  styleUrl: './winners-page.component.scss',
})
export class WinnersPageComponent implements OnInit {
  private bookmakerService = inject(BookmakerService);
  protected podium = this.bookmakerService.raceResults;
  protected isBankOpen = this.bookmakerService.isBankOpen;
  protected balance = this.bookmakerService.balance;

  protected isInitLoad = signal<boolean>(true);

  ngOnInit(): void {
    setTimeout(() => this.isInitLoad.set(false));
  }
}
