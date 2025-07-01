import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player';
import { RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';
import { FilterPlayersComponent } from '../filter-players/filter-players.component';


@Component({
  selector: 'app-list-players',
  standalone: true,
  imports: [RouterLink, ProgressBarComponent, FilterPlayersComponent],
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.css']
})
export class ListPlayersComponent implements OnInit {
  listPlayers: Player[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 36;
  filters: any = {};
  Object = Object; // Agregado para usar Object.keys en el template


  constructor(private _playerService: PlayerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListPlayers();
  }

getListPlayers(): void {
  this.loading = true;
  const offset = (this.currentPage - 1) * this.pageSize;

  if (Object.keys(this.filters).length === 0) {
    this._playerService.getPlayersWithPagination(this.pageSize, offset).subscribe({
      next: (data) => {
        this.listPlayers = data;
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al cargar jugadores', 'Error');
        this.loading = false;
      }
    });
  } else {
    this._playerService.getPlayersWithFilters({ ...this.filters, limit: this.pageSize, offset }).subscribe({
      next: (data) => {
        this.listPlayers = data;
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al filtrar jugadores', 'Error');
        this.loading = false;
      }
    });
  }
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

  onApplyFilter(filterData: any) {
    console.log('Filtro aplicado:', filterData);
  this.filters = filterData;
  this.currentPage = 1;
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
    if (overall >= 80) return '#ffd700';       // Amarillo para 80-84
    return '#BF814B';                          // Marrón para menos de 80
  }

  exportToCSV(): void {
    if (!this.listPlayers || this.listPlayers.length === 0) {
      this.toastr.info('No hay jugadores para exportar', 'Información');
      return;
    }

    const replacer = (key: string, value: any) => value === null ? '' : value;
    const header = Object.keys(this.listPlayers[0]);
    const csv = [
      header.join(','), // header row first
      ...this.listPlayers.map(row => {
        const typedRow = row as Record<string, any>;
        return header.map(fieldName => JSON.stringify(typedRow[fieldName], replacer)).join(',');
      })
    ].join('\r\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jugadores.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
