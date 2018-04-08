import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {GameComponent} from './game/game.component';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {HostScreenComponent} from './host-screen/host-screen.component';
import {WaitingScreenComponent} from './waiting-screen/waiting-screen.component';
import {InGameScreenComponent} from './in-game-screen/in-game-screen.component';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'game', component: GameComponent}, // this works when we omit "canActivate: [AuthGuardService], in the template it was { path: 'game', component: GameComponent,canActivate: [AuthGuardService]}"
    { path: 'host-screen', component: HostScreenComponent},
    { path: 'waiting-screen', component: WaitingScreenComponent},
    { path: 'in-game-screen', component: InGameScreenComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);



