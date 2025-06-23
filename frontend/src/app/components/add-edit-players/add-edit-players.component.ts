import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../interfaces/player';

@Component({
  selector: 'app-add-edit-players',
  imports: [ReactiveFormsModule],
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
    public router: Router
  ) {
    this.form = this.fb.group({
      long_name: [''],
      age: [''],
      overall: [''],
      club_name: [''],
      nationality_name: [''],
      player_positions: [''],
      preferred_foot: ['Right'],
      height_cm: [''],
      weight_kg: [''],
      player_face_url: [''],
      fifa_version: [''],
      pace: [''],
      shooting: [''],
      passing: [''],
      dribbling: [''],
      defending: [''],
      physic: [''],
      attacking_finishing: [''],
      skill_ball_control: [''],
      movement_reactions: [''],
      power_shot_power: ['']
    });

    // Esto es temporal - en una app real deberías obtener los jugadores de un servicio
    this.listPlayers = [
      {
        id: 1,
        long_name: 'Lionel Messi',
        player_face_url: 'https://cdn.futbin.com/content/fifa24/img/players/158023.png',
        club_name: 'Inter Miami',
        nationality_name: 'Argentina',
        player_positions: 'RW, CAM',
        fifa_version: '24',
        fifa_update: 'Latest',
        age: 36,
        overall: 90,
        potential: 90,
        value_eur: 45000000,
        wage_eur: 20000000,
        height_cm: 170,
        weight_kg: 72,
        preferred_foot: 'Left',
        weak_foot: 4,
        skill_moves: 4,
        work_rate: 'Medium/Low',
        pace: 81,
        shooting: 89,
        passing: 90,
        dribbling: 94,
        defending: 34,
        physic: 65,
        attacking_finishing: 92,
        skill_ball_control: 95,
        movement_reactions: 94,
        mentality_composure: 96,
        power_shot_power: 86,
        mentality_vision: 94
      },
      // ... otros jugadores
    ];
  }

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
    if (this.form.valid) {
      // Aquí iría la lógica para guardar los cambios
      console.log('Formulario válido', this.form.value);
      this.router.navigate(['/list']);
    }
  }
}