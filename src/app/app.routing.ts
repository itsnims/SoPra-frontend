import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {GameComponent} from './game/game.component';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {HostScreenComponent} from './host-screen/host-screen.component';
import {WaitingScreenComponent} from './waiting-screen/waiting-screen.component';
import {InGameScreenComponent} from './in-game-screen/in-game-screen.component';
import {HexagonBoardComponent} from './hexagon-board/hexagon-board.component';
import {StandardComponent} from './standard/standard.component';
import {HexComponent} from './hex/hex.component';
import {HillsofgoldComponent} from './hillsofgold/hillsofgold.component';
import {HomestretchComponent} from './homestretch/homestretch.component';
import {SerpentineComponent} from './serpentine/serpentine.component';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'game', component: GameComponent}, // this works when we omit "canActivate: [AuthGuardService], in the template it was
  // { path: 'game', component: GameComponent,canActivate: [AuthGuardService]}"
    { path: 'host-screen', component: HostScreenComponent},
    { path: 'waiting-screen', component: WaitingScreenComponent},
    { path: 'in-game-screen', component: InGameScreenComponent},
  {path: 'hexagon-board', component: HexagonBoardComponent},
  {path: 'standard', component: StandardComponent},
  {path: 'hillsofgold', component: HillsofgoldComponent},
  {path: 'homestretch', component: HomestretchComponent},
  {path: 'serpentine', component: SerpentineComponent},




  // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);



