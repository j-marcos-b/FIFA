import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  template: `
    <div class="welcome-container">
      <h1>Bienvenido a la App de Jugadores FIFA</h1>
      <img src="im.png" alt="jugador" style="width: 450px;">
      <button style="display: none;" (click)="goToLogin()">Iniciar Sesión</button>
    </div>
  `,
  styles: [`
    .welcome-container {
      text-align: center;
      margin-top: 100px;
    }
  `]
})
export class WelcomePageComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
