// add-edit-players.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../interfaces/player';
import { CommonModule } from '@angular/common';
import { PlayerService } from '../../services/player.service';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-players',
  imports: [ReactiveFormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './add-edit-players.component.html',
  styleUrl: './add-edit-players.component.css'
})
export class AddEditPlayersComponent implements OnInit {
  form: FormGroup;
  playerId: number | null = null;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService,
    private _playerService: PlayerService // Inyectar el servicio
  ) {
    this.form = this.fb.group({
      long_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      age: ['', [Validators.required, Validators.min(16), Validators.max(50)]],
      overall: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
      club_name: ['', [Validators.required]],
      nationality_name: ['', [Validators.required]],
      player_positions: ['', [Validators.required]],
      preferred_foot: ['', [Validators.required]],
      height_cm: ['', [Validators.required, Validators.min(150), Validators.max(220)]],
      weight_kg: ['', [Validators.required, Validators.min(40), Validators.max(120)]],
      player_face_url: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/)]],
      fifa_version: ['', [Validators.required, Validators.min(15), Validators.max(23)]],
      pace: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
      shooting: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
      passing: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
      dribbling: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
      defending: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
      physic: ['', [Validators.required, Validators.min(0), Validators.max(99)]],
      attacking_finishing: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      skill_ball_control: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      movement_reactions: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      power_shot_power: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit() {
    this.playerId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.playerId) {
      this.loadPlayerData(this.playerId);
    }
  }

  loadPlayerData(id: number) {
    this.loading = true;
    this._playerService.getPlayerById(id).subscribe({
      next: (player) => {
        this.form.patchValue(player);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading player', err);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const player: Player = {
        id: this.playerId || 0, // 0 si es nuevo jugador
        ...this.form.value
      };

      if (this.playerId) {
        // Editar jugador existente
        this._playerService.updatePlayer(this.playerId, player).subscribe({
          next: () => {
            this.toastr.info('¡Jugador actualizado correctamente!');
            this.router.navigate(['/players']); // Volver a la lista
          },
          error: (err) => {
            console.error('Error al actualizar jugador', err);
            this.toastr.error('Error al actualizar el jugador');
          }
        });
      } else {
        // Agregar nuevo jugador
        this._playerService.savePlayer(player).subscribe({
          next: () => {
            this.toastr.info('Jugador agregado correctamente!');
            this.router.navigate(['/players']); // Volver a la lista
          },
          error: (err) => {
            console.error('Error al agregar jugador', err);
            this.toastr.error('Error al agregar el jugador');
          }
        });
      }
    } else {
      this.toastr.error('Formulario inválido, por favor completa todos los campos correctamente.');
    }
  }

}