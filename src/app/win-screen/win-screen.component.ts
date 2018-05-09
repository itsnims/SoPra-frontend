import { Component, OnInit } from '@angular/core';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/takeWhile';


@Component({
  selector: 'app-win-screen',
  templateUrl: './win-screen.component.html',
  styleUrls: ['./win-screen.component.css']
})
export class WinScreenComponent implements OnInit {
  gameEnded = false; // if true game has ended, win screen overlay is shown
  winner = 'xxx';
  interval: number;
  alive: boolean;
  apiUrl = 'https://sopra-fs18-group13-server.herokuapp.com/Games/';
  currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
  winnerObject: object;



  // to do: refresh gameEnded (rest request), get winner
  constructor(private http: HttpClient) {
    this.interval = 1008;
    this.alive = true;
  }

  ngOnInit() {
    this.http.get('https://sopra-fs18-group13-server.herokuapp.com/Games/game/winner')
      .subscribe(result => {
        this.winnerObject = result;
        for (let el in this.winnerObject) {
          if (el === 'name') {
            this.winner = this.winnerObject[el];
          }
        }
      });

    TimerObservable.create(0, this.interval)
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.http.get(this.apiUrl + this.currentRoom + '/checkWinner')
          .subscribe(result => {
            if (result) {
              this.gameEnded = true;
            }
          });
      });
    }
}








