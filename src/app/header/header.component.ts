import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ActionButtonComponent } from './action-button/action-button.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ActionButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
