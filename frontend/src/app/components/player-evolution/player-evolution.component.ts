import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { ActivatedRoute } from '@angular/router';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-player-evolution',
  templateUrl: './player-evolution.component.html',
  styleUrls: ['./player-evolution.component.css']
})
export class PlayerEvolutionComponent implements OnInit {
  playerId: number = 0; // Inicializado con valor por defecto
  playerData: Player | null = null; // Inicializado como null
  evolutionData: Player[] = []; // Inicializado como array vacío
  radarChart: Chart<'line'> | null = null; // Cambiado a tipo 'line' para coincidir con el tipo de gráfico usado

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.playerId = idParam ? +idParam : 0;
    
    if (this.playerId > 0) {
      this.loadPlayerData();
    }
  }

  loadPlayerData(): void {
    this.playerService.getPlayerById(this.playerId).subscribe({
      next: (player) => {
        this.playerData = player;
        this.loadEvolutionData();
      },
      error: (err) => {
        console.error('Error loading player data:', err);
        this.playerData = null;
      }
    });
  }

  loadEvolutionData(): void {
    this.playerService.getPlayerEvolution(this.playerId).subscribe({
      next: (data) => {
        this.evolutionData = data;
        this.createRadarChart();
      },
      error: (err) => {
        console.error('Error loading evolution data:', err);
        this.evolutionData = [];
      }
    });
  }

  createRadarChart(): void {
    // Destruir el gráfico anterior si existe
    if (this.radarChart) {
      this.radarChart.destroy();
      this.radarChart = null;
    }

    const canvas = document.getElementById('radarChart') as HTMLCanvasElement | null;
    
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    // Etiquetas para el eje X: versiones FIFA
    const labels = this.evolutionData.map(player => `FIFA ${player.fifa_version}`);

    // Estadísticas a mostrar como series
    const stats = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physic'];
    const statLabels = ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY'];
    const colors = ['#4DA3BD', '#FF6384', '#36A2EB', '#FFCE56', '#8A2BE2', '#FF7F50'];

    // Construir datasets: cada estadística es una serie con valores por versión FIFA
    const datasets = stats.map((stat, index) => ({
      label: statLabels[index],
      data: this.evolutionData.map(player => (player as any)[stat] || 0),
      borderColor: colors[index],
      backgroundColor: colors[index] + '33', // color con transparencia
      fill: false,
      tension: 0.1,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2
    }));

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Versión FIFA'
            }
          },
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Valor Estadístico'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'nearest',
            intersect: false,
            callbacks: {
              label: (context) => {
                return `${context.dataset.label}: ${context.parsed.y}`;
              }
            }
          }
        }
      }
    };

    this.radarChart = new Chart(ctx, config);
  }

  ngOnDestroy(): void {
    if (this.radarChart) {
      this.radarChart.destroy();
    }
  }
}