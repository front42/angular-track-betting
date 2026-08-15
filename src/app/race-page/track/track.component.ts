import { Component, input } from '@angular/core';

@Component({
  selector: 'app-track',
  imports: [],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export class TrackComponent {
  phase = input.required<string>();
  name = input.required<string>();
  fill = input.required<string>();

  protected showRacerCard() {
    console.log(`${this.name()}'s card is displayed.`);
  }
}
