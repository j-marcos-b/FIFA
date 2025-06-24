import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../../interfaces/player';
import { JsonPipe } from '@angular/common';

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
    public router: Router,
  ) {
    this.form = this.fb.group({
      long_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      age: [null, [Validators.required, Validators.min(16), Validators.max(50)]],
      overall: [null, [Validators.required, Validators.min(40), Validators.max(99)]],
      club_name: ['', [Validators.required, Validators.maxLength(50)]],
      nationality_name: ['', [Validators.required, Validators.maxLength(50)]],
      player_positions: ['', [Validators.required, Validators.maxLength(50)]],
      preferred_foot: ['Right', Validators.pattern(/^(Right|Left)$/)],
      height_cm: [null, [Validators.required, Validators.min(150), Validators.max(220)]],
      weight_kg: [null, [Validators.required, Validators.min(40), Validators.max(120)]],
      player_face_url: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/)]],
      fifa_version: ['24', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      fifa_update: ['Latest', Validators.required],
      pace: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
      shooting: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
      passing: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
      dribbling: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
      defending: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
      physic: [null, [Validators.required, Validators.min(0), Validators.max(99)]],
      attacking_finishing: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      skill_ball_control: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      movement_reactions: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      power_shot_power: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
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
      {
        id: 2,
        long_name: 'Kylian Mbappé',
        player_face_url: 'https://cdn.futbin.com/content/fifa24/img/players/231747.png',
        club_name: 'Paris Saint-Germain',
        nationality_name: 'France',
        player_positions: 'ST, LW',
        fifa_version: '24',
        fifa_update: 'Latest',
        age: 24,
        overall: 91,
        potential: 95,
        value_eur: 190500000,
        wage_eur: 230000,
        height_cm: 182,
        weight_kg: 75,
        preferred_foot: 'Right',
        weak_foot: 4,
        skill_moves: 5,
        work_rate: 'High/Medium',
        pace: 97,
        shooting: 89,
        passing: 80,
        dribbling: 92,
        defending: 39,
        physic: 77,
        attacking_finishing: 93,
        skill_ball_control: 92,
        movement_reactions: 95,
        mentality_composure: 92,
        power_shot_power: 88,
        mentality_vision: 84
      }
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