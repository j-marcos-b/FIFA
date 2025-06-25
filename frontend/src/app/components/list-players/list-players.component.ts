import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player';
import { RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-list-players',
  imports: [RouterLink],
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.css']
})
export class ListPlayersComponent implements OnInit {
  listPlayers: Player[] = [];

  constructor(private _playerService: PlayerService) {}

  ngOnInit(): void {
    this.getListPlayers();
  }

  getListPlayers(): void {
    this._playerService.getListPlayers().subscribe((data) => {
      this.listPlayers = data;
    })
  }
    

  formatValue(value: number | undefined): string {
    if (!value) return 'N/A';
    if (value >= 1000000) {
      return '€' + (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
      return '€' + (value / 1000).toFixed(0) + 'K';
    }
    return '€' + value.toString();
  }

  getOverallColor(overall: number): string {
    if (overall >= 90) return '#ff0000'; // Rojo para 90+
    if (overall >= 85) return '#ff8c00'; // Naranja para 85-89
    if (overall >= 80) return '#ffd700'; // Oro para 80-84
    return '#c0c0c0'; // Plata para menos de 80
  }
}