import { Routes } from '@angular/router';
import { ListPlayersComponent } from './components/list-players/list-players.component';
import { AddEditPlayersComponent } from './components/add-edit-players/add-edit-players.component';
import { PlayerEvolutionComponent } from './components/player-evolution/player-evolution.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: WelcomePageComponent },
    { path: 'login', component: LoginRegisterComponent },
    { path: 'players', component: ListPlayersComponent, canActivate: [AuthGuard] },
    { path: 'players/:id', component: ListPlayersComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddEditPlayersComponent, canActivate: [AuthGuard] },
    { path: 'edit/:id', component: AddEditPlayersComponent, canActivate: [AuthGuard] },
    { path: 'player-evolution/:id', component: PlayerEvolutionComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
