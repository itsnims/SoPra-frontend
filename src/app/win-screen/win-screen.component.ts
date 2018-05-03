import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-win-screen',
  templateUrl: './win-screen.component.html',
  styleUrls: ['./win-screen.component.css']
})
export class WinScreenComponent implements OnInit {
  gameEnded = false; // if true game has ended, win screen overlay is shown
  winner = 'xxx';

  // to do: refresh gameEnded (rest request), get winner
  constructor() { }

  ngOnInit() {
  }

}
