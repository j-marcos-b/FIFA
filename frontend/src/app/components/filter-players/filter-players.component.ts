import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-players',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-players.component.html',
  styleUrls: ['./filter-players.component.css']
})
export class FilterPlayersComponent {
  @Output() applyFilter = new EventEmitter<any>();

  filterType: string = 'name';
  filterValue: string = '';
  fifaVersions: number[] = [15, 16, 17, 18, 19, 20, 21, 22, 23];


  onSubmit() {
    const filter = {
      [this.filterType]: this.filterType === 'fifaVersion' ? Number(this.filterValue) : this.filterValue
    };
    this.applyFilter.emit(filter);
  }
}
