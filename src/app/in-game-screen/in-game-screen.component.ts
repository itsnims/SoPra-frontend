import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-game-screen',
  templateUrl: './in-game-screen.component.html',
  styleUrls: ['./in-game-screen.component.css']
})

export class InGameScreenComponent implements OnInit {
  playerName = 'Your name'; //later replace with this.username or whatever works

  lowerMarketFree = true; // erhält true / false von isFree() im backend
  showMarket = false;

  classTest = "marketCard";
  opponent1 = 'Opponent 1 name';
  opponent2 = 'Opponent 2 name';
  opponent3 = 'Opponent 3 name';

  marketCard1 = 'Bottom Card 1';
  marketCard2 = 'Bottom Card 2';
  marketCard3 = 'Bottom Card 3';
  marketCard4 = 'Bottom Card 4';
  marketCard5 = 'Bottom Card 5';
  marketCard6 = 'Bottom Card 6';
  marketCard7 = 'Upper Card 1';
  marketCard8 = 'Upper Card 2';
  marketCard9 = 'Upper Card 3';
  marketCard10 = 'Upper Card 4';
  marketCard11 = 'Upper Card 5';
  marketCard12 = 'Upper Card 6';
  marketCard13 = 'Upper Card 7';
  marketCard14 = 'Upper Card 8';
  marketCard15 = 'Upper Card 9';
  marketCard16 = 'Upper Card 10';
  marketCard17 = 'Upper Card 11';
  marketCard18 = 'Upper Card 12';

  handCard1 = 'Hand Card 1';
  handCard2 = 'Hand Card 2';
  handCard3 = 'Hand Card 3';
  handCard4 = 'Hand Card 4';

  showMarketFunc() {
    if (this.showMarket === true) {
      this.showMarket = false;
    } else {
      this.showMarket = true;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
