import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MaterialModule} from './modules/material.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MaterialModule,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lanchonete-front';
}
