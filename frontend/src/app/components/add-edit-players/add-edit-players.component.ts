import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../interfaces/player';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-players',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-players.component.html',
  styleUrl: './add-edit-players.component.css'
})
export class AddEditPlayersComponent implements OnInit {
  form: FormGroup;
  playerId: number | null = null;
  listPlayers: Player[] = []; // Aquí deberías obtener tus jugadores, quizás de un servicio

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
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

    this.listPlayers = [
      {
        id: 1,
        long_name: 'Lionel Messi',
        player_face_url: 'https://cdn.futbin.com/content/fifa24/img/players/158023.png',
        club_name: 'Inter Miami',
        nationality_name: 'Argentina',
        player_positions: 'RW, CAM',
        fifa_version: '24',
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
        fifa_version: '24',
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
  }

  //Carga el jugador a editar si existe
  //Si no existe, el formulario estará vacío para agregar un nuevo jugador
  ngOnInit() {
    this.playerId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.playerId) {
      const playerToEdit = this.listPlayers.find(p => p.id === this.playerId);
      if (playerToEdit) {
        this.form.patchValue(playerToEdit);
      }
    }
  }

  onSubmit() {
if (this.form.valid) { // Generar ID automático para nuevos jugadores
    const newId = this.playerId ? this.playerId : (Math.max(0, ...this.listPlayers.map(p => p.id))) + 1;

      const player: Player = {
        id: newId, // Usar el ID existente o generar uno nuevo
        long_name: this.form.value.long_name,
        player_face_url: this.form.value.player_face_url,
        club_name: this.form.value.club_name,
        nationality_name: this.form.value.nationality_name,
        player_positions: this.form.value.player_positions,
        fifa_version: this.form.value.fifa_version,
        age: this.form.value.age,
        overall: this.form.value.overall,
        height_cm: this.form.value.height_cm,
        weight_kg: this.form.value.weight_kg,
        preferred_foot: this.form.value.preferred_foot,

        // Estadísticas principales
        pace: this.form.value.pace,
        shooting: this.form.value.shooting,
        passing: this.form.value.passing,
        dribbling: this.form.value.dribbling,
        defending: this.form.value.defending,
        physic: this.form.value.physic,

        // Estadísticas específicas relevantes
        attacking_finishing: this.form.value.attacking_finishing,
        skill_ball_control: this.form.value.skill_ball_control,
        movement_reactions: this.form.value.movement_reactions,
        power_shot_power: this.form.value.power_shot_power
      };

      // Aquí iría la lógica para guardar los cambios (por ejemplo, llamar a un servicio)
      // this.playerService.savePlayer(player);

      this.router.navigate(['/list']);
      console.log(player)
    }
  }
}