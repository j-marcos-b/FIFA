import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player';
import { RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-players',
  standalone: true,
  imports: [RouterLink, ProgressBarComponent],
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.css']
})
export class ListPlayersComponent implements OnInit {
  listPlayers: Player[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 36;

  constructor(private _playerService: PlayerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListPlayers();
  }

  getListPlayers(): void {
    this.loading = true;
    const offset = (this.currentPage - 1) * this.pageSize;
    this._playerService.getPlayersWithPagination(this.pageSize, offset).subscribe({
      next: (data: Player[]) => {
        this.listPlayers = data;
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al cargar jugadores', 'Error');
        console.error(err);
        this.loading = false;
      }
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.getListPlayers();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getListPlayers();
    }
  }

  nextTenPages(): void {
    this.currentPage += 10;
    this.getListPlayers();
  }

  previousTenPages(): void {
    if (this.currentPage > 10) {
      this.currentPage -= 10;
    } else {
      this.currentPage = 1;
    }
    this.getListPlayers();
  }


  formatValue(value: number | undefined): string {
    if (!value) return 'N/A';
    if (value >= 1_000_000) return '€' + (value / 1_000_000).toFixed(1) + 'M';
    if (value >= 1_000) return '€' + (value / 1_000).toFixed(0) + 'K';
    return '€' + value.toString();
  }

  getOverallColor(overall: number): string {
    if (overall >= 90) return '#ff0000';       // Rojo para 90+
    if (overall >= 85) return '#ff8c00';       // Naranja para 85-89
    if (overall >= 80) return '#ffd700';       // Oro para 80-84
    return '#c0c0c0';                          // Plata para menos de 80
  }
}
