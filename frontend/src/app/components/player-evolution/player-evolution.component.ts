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
  radarChart: Chart<'radar'> | null = null; // Inicializado como null

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

    const labels = ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY'];
    const datasets = this.evolutionData.map(player => ({
      label: `FIFA ${player.fifa_version}`,
      data: [
        player.pace || 0,
        player.shooting || 0,
        player.passing || 0,
        player.dribbling || 0,
        player.defending || 0,
        player.physic || 0
      ],
      borderWidth: 2,
      pointBackgroundColor: '#4DA3BD',
      pointBorderColor: '#fff',
      pointHoverRadius: 5
    }));

    const config: ChartConfiguration<'radar'> = {
      type: 'radar',
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100,
            pointLabels: {
              font: {
                size: 12
              }
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return `${context.dataset.label}: ${context.raw}`;
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