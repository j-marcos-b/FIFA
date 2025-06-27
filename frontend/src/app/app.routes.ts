import { Routes } from '@angular/router';
import { ListPlayersComponent } from './components/list-players/list-players.component';
import { AddEditPlayersComponent } from './components/add-edit-players/add-edit-players.component';
import { PlayerEvolutionComponent } from './components/player-evolution/player-evolution.component';

export const routes: Routes = [
    { path: '', component: ListPlayersComponent },
    { path: 'players', component: ListPlayersComponent },
    { path: 'players/:id', component: ListPlayersComponent },
    { path: 'add', component: AddEditPlayersComponent },
    { path: 'edit/:id', component: AddEditPlayersComponent },
    { path: 'player-evolution/:id', component: PlayerEvolutionComponent },
    { path: '**', redirectTo: '' }
];
