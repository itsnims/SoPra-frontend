import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-in-game-screen',
  templateUrl: './in-game-screen.component.html',
  styleUrls: ['./in-game-screen.component.css']
})

export class InGameScreenComponent implements OnInit {
  playerName = 'Your name'; //later replace with this.username or whatever works

  isFree = false; // überprüft ob lowerMarket 6 karten hat
  firstPurchase = false; // true / false muss invertiert sein im vergleich zu backend

  showMarket = false; // für show market button
  chosenMarketCard = ''; // wird bei buy card mitgegeben

  // temporär um die karten anzuzeigen
  upperCards = [
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

  drawPile = [
    {cardID: 'explorer'},
    {cardID: 'explorer'},
    {cardID: 'traveler'},
    {cardID: 'traveler'}
  ];

  handCards = [
    {cardClass: 'sailor', cardID: '1'},
    {cardClass: 'explorer', cardID: '2'},
    {cardClass: 'traveler', cardID: '3'},
    {cardClass: 'traveler', cardID: '4'},
    {cardClass: 'traveler', cardID: '5'}

  ];

  selected:Object[]; // angekreuzte karten

  selectedCards = 0;
  opponent1 = 'Opponent 1 name';
  opponent2 = 'Opponent 2 name';
  opponent3 = 'Opponent 3 name';

  checkIsFree() {
    if (this.lowerCards.length !== 6)
    {this.isFree = true;}
    else {this.isFree = false;}
  }

  toggleHandSelection(card) { // = toggleSelection(user) ist noch fehlerhaft
    if(card.notChecked){
      card.notChecked=false;
      this.selectedCards--;
    }
    else{
      this.selectedCards++;
      var target = card.target || card.srcElement || card.currentTarget;
      var idAttr = target.attributes.id;
      card = idAttr.nodeValue;
      let handCard = {'id':card, 'notChecked': true};
      this.selected.push(handCard);
    }
  }

  uMavailable() { // damit der upper market korrekt ausgewählt wird
    if (this.firstPurchase === false)
      {this.isFree = false;}
  }

  showMarketFunc() {
    if (this.showMarket === true) {
      this.showMarket = false;
    } else {
      this.checkIsFree()
      this.showMarket = true;}
  }

  buy() {
    this.firstPurchase = true;
  }
  chooseMarketCard(event) { // chosenMarketCard erhält ID vom zuletzt ausgewählten Button
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    this.chosenMarketCard = idAttr.nodeValue;
  }

  constructor() { }

  ngOnInit() {
  }

}
