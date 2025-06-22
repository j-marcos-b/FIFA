import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-list-players',
  imports: [],
  templateUrl: './list-players.component.html',
  styleUrl: './list-players.component.css'
})
export class ListPlayersComponent implements OnInit {
  listPlayers: Player[] = [
    {
      id: 1,
      long_name: 'Lionel Messi',
      player_face_url: 'https://example.com/messi.jpg',
      club_name: 'Paris Saint-Germain',
      player_positions: 'RW',
      fifa_version: '22',
      age: 34
    },
    {
      id: 2,
      long_name: 'Cristiano Ronaldo',
      player_face_url: 'https://example.com/ronaldo.jpg',
      club_name: 'Manchester United',
      player_positions: 'ST',
      fifa_version: '22',
      age: 36
    },
    {
      id: 3,
      long_name: 'Neymar Jr.',
      player_face_url: 'https://example.com/neymar.jpg',
      club_name: 'Paris Saint-Germain',
      player_positions: 'LW',
      fifa_version: '22',
      age: 29
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
