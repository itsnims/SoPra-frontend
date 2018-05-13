import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {GameComponent} from './game/game.component';
import {LoginComponent} from './login/login.component';
import {UserService} from './shared/services/user.service';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {AuthenticationService} from './shared/services/authentication.service';
import {routing} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HostScreenComponent } from './host-screen/host-screen.component';
import {WaitingScreenComponent} from './waiting-screen/waiting-screen.component';
import {InGameScreenComponent} from './in-game-screen/in-game-screen.component';
import { DataService } from './data.service';
import { HttpModule, RequestOptions} from '@angular/http';
import { HexagonBoardComponent } from './hexagon-board/hexagon-board.component';
import { StandardComponent } from './standard/standard.component';
import { RoomService} from './shared/services/room.service';
import { ColumnComponent } from './column/column.component';
import { PlayerComponent } from './player/player.component';
import { HexComponent } from './hex/hex.component';
import { HillsofgoldComponent } from './hillsofgold/hillsofgold.component';
import { HomestretchComponent } from './homestretch/homestretch.component';
import { SerpentineComponent } from './serpentine/serpentine.component';
import { WinScreenComponent } from './win-screen/win-screen.component';
import { AppDirective } from './app.directive';
import { SwamplandsComponent } from './swamplands/swamplands.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    HostScreenComponent,
    WaitingScreenComponent,
    InGameScreenComponent,
    HexagonBoardComponent,
    StandardComponent,
    ColumnComponent,
    PlayerComponent,
    HexComponent,
    HillsofgoldComponent,
    HomestretchComponent,
    SerpentineComponent,
    WinScreenComponent,
    AppDirective,
    SwamplandsComponent,
  ],
  entryComponents: [PlayerComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    routing
  ],
  providers: [AuthenticationService, AuthGuardService, UserService, DataService, RoomService, LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
