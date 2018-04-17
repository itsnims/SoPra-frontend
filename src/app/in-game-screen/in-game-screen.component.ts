import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-in-game-screen',
  templateUrl: './in-game-screen.component.html',
  styleUrls: ['./in-game-screen.component.css']
})

export class InGameScreenComponent implements OnInit {
  playerName = 'Your name'; //later replace with this.username or whatever works

  isFree = true; // erhält true / false von isFree() im backend
  firstPurchase = false; // true / false muss invertiert sein im vergleich zu backend

  showMarket = false; // für show market button
  chosenMarketCard = ''; // wird bei buy card mitgegeben

  upperCards = [    // temporär um den markt zu testen
    {cardID: 'cartographer', left: '3'},
    {cardID: 'compass', left: '3'},
    {cardID: 'native', left: '3'},
    {cardID: 'scientist', left: '3'},
    {cardID: 'transmitter', left: '3'},
    {cardID: 'travel-log', left: '3'},
    {cardID: 'sailor', left: '3'},
    {cardID: 'captain', left: '3'},
    {cardID: 'explorer', left: '3'},
    {cardID: 'scout', left: '3'},
    {cardID: 'trailblazer', left: '3'},
    {cardID: 'pioneer', left: '3'}
    ];

  lowerCards = [
    {cardID: 'giant-machete', left: '3'},
    {cardID: 'jack-of-all-trades', left: '3'},
    {cardID: 'adventurer', left: '3'},
    {cardID: 'prop-plane', left: '3'},
    {cardID: 'traveler', left: '3'},
    {cardID: 'photographer', left: '3'}
  ];

  opponent1 = 'Opponent 1 name';
  opponent2 = 'Opponent 2 name';
  opponent3 = 'Opponent 3 name';

  handCard1 = 'Hand Card 1';
  handCard2 = 'Hand Card 2';
  handCard3 = 'Hand Card 3';
  handCard4 = 'Hand Card 4';

  uMavailable() {
    if (this.firstPurchase === false)
      {this.isFree = false;}
  }

  showMarketFunc() {
    if (this.showMarket === true) {
      this.showMarket = false;
    } else {
      this.showMarket = true;}
  }

  buy() {
    // this.chosenMarketCard wird ans backend gegeben
  }
  chooseMarketCard(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    this.chosenMarketCard = idAttr.nodeValue;
  }

  constructor() { }

  ngOnInit() {
  }

}
