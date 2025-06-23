import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-players',
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-players.component.html',
  styleUrl: './add-edit-players.component.css'
})
export class AddEditPlayersComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      long_name: [''],
      player_face_url: [''],
      club_name: [''],
    })
  }

  ngOnInit() {
   
  }


}
