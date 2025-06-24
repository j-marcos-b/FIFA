import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-players',
  imports: [RouterLink],
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.css']
})
export class ListPlayersComponent implements OnInit {
  listPlayers: Player[] = [
    {
      id: 1,
      long_name: 'Lionel Messi',
      player_face_url: 'https://cdn.futbin.com/content/fifa24/img/players/158023.png',
      club_name: 'Inter Miami',
      nationality_name: 'Argentina',
      player_positions: 'RW, CAM',
      fifa_version: '23',
      age: 36,
      overall: 90,
      height_cm: 170,
      weight_kg: 72,
      preferred_foot: 'Left',
      pace: 81,
      shooting: 89,
      passing: 90,
      dribbling: 94,
      defending: 34,
      physic: 65,
      attacking_finishing: 92,
      skill_ball_control: 95,
      movement_reactions: 94,
      power_shot_power: 86,
    },
    {
      id: 2,
      long_name: 'Kylian Mbappé',
      player_face_url: 'https://cdn.futbin.com/content/fifa24/img/players/231747.png',
      club_name: 'Paris Saint-Germain',
      nationality_name: 'France',
      player_positions: 'ST, LW',
      fifa_version: '23',
      age: 24,
      overall: 91,
      height_cm: 182,
      weight_kg: 75,
      preferred_foot: 'Right',
      pace: 97,
      shooting: 89,
      passing: 80,
      dribbling: 92,
      defending: 39,
      physic: 77,
      attacking_finishing: 93,
      skill_ball_control: 92,
      movement_reactions: 95,
      power_shot_power: 88,
    }
  ];

  constructor() {}

  ngOnInit(): void {}

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