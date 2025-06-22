import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListPlayersComponent } from "./components/list-players/list-players.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ListPlayersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
