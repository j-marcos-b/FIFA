// player.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/players/';
  }

  getListPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  // Nuevo método para obtener un jugador por ID
  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  
}