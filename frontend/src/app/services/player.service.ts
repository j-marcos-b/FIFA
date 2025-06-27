import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
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

  /**
   * Obtiene todos los jugadores sin filtros
   */
  getListPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.myAppUrl}${this.myApiUrl}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene un jugador por ID
   * @param id ID del jugador
   */
  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.myAppUrl}${this.myApiUrl}${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Guarda un nuevo jugador
   * @param player Datos del jugador
   */
  savePlayer(player: Player): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, player)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Actualiza un jugador existente
   * @param id ID del jugador
   * @param player Datos actualizados
   */
  updatePlayer(id: number, player: Player): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, player)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene jugadores con paginación
   * @param limit Cantidad de resultados por página
   * @param offset Número de resultados a saltar
   */
  getPlayersWithPagination(limit: number, offset: number): Observable<Player[]> {
    return this.http.get<Player[]>(
      `${this.myAppUrl}${this.myApiUrl}?limit=${limit}&offset=${offset}`
    ).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtiene jugadores con filtros avanzados
   * @param filters Objeto con los parámetros de filtrado
   */
  getPlayersWithFilters(filters: {
    limit: number;
    offset: number;
    name?: string;
    club?: string;
    nationality?: string;
    fifaVersion?: number;
  }): Observable<Player[]> {
    let params = new HttpParams()
      .set('limit', filters.limit.toString())
      .set('offset', filters.offset.toString());

    if (filters.name) params = params.set('name', filters.name);
    if (filters.club) params = params.set('club', filters.club);
    if (filters.nationality) params = params.set('nationality', filters.nationality);
    if (filters.fifaVersion) params = params.set('fifaVersion', filters.fifaVersion.toString());

    return this.http.get<Player[]>(`${this.myAppUrl}${this.myApiUrl}`, { params });
  }

  /**
   * Maneja errores HTTP
   * @param error Error recibido
   * @returns Observable con el error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}