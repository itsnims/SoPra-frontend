import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-in-game-screen',
  templateUrl: './in-game-screen.component.html',
  styleUrls: ['./in-game-screen.component.css']
})

export class InGameScreenComponent implements OnInit {
  playerName = 'Your name'; // later replace with this.username or whatever works

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

  handCards = [
    {cardClass: 'sailor', checked: false },
    {cardClass: 'explorer', checked: false},
    {cardClass: 'traveler', checked: false},
    {cardClass: 'traveler', checked: false},
    {cardClass: 'cartographer', checked: false}
  ];

  selected = []; // angekreuzte karten
  selectedCards = 0;
  selectedCardIsActionCard = false;
  i = 0;
  isItMyTurn = false;
  useActionCard = true;
  useExpeditionCard = true;
  buyAvailable = true;
  discard = true;

  actionCards = [
    'cartographer',
    'compass',
    'native',
    'scientist',
    'transmitter',
    'travel-log'
  ];

  opponent1 = 'Opponent 1 name';
  opponent2 = 'Opponent 2 name';
  opponent3 = 'Opponent 3 name';

  updateSelectedCardIsActionCard() {
    for (this.i = 0; this.i < 6; this.i++) {
      if (this.selected[0] === this.actionCards[this.i]) {
        this.selectedCardIsActionCard = true;
        return;
      }
    }
    this.selectedCardIsActionCard = false;
  }

  updateUseActionCard() {
    if (this.isItMyTurn === true) {
      if (this.selectedCards === 1 && this.selectedCardIsActionCard === true) {
        this.useActionCard = false;
        return;
      } else {
        this.useActionCard = true;
        return;
      }
    }
    this.useActionCard = true;
  }
  updateUseExpeditionCard() {
    if (this.isItMyTurn === true) {
      if (this.selectedCards === 1 && this.selectedCardIsActionCard === false) {
        this.useExpeditionCard = false;
        return;
      } else {
        this.useExpeditionCard = true;
        return;
      }
    }
    this.useExpeditionCard = true;
  }
  updateBuyAvailable() {

  }
  updateDiscard() {

  }
  checkIsFree() {
    if (this.lowerCards.length !== 6) {
      this.isFree = false; }
    else {this.isFree = true; }
    if (this.firstPurchase === true) {
      this.isFree = true; }
  }

  toggleHandSelection(card, i) {
    const newCard = card;
    if (this.handCards[i].checked === true) {
      this.handCards[i].checked = false;
      const position = this.selected.indexOf(newCard);
      this.selectedCards--;
      this.selected.splice(position, 1);
    }
    else {
      this.handCards[i].checked = true;
      this.selectedCards++;
      this.selected.push(newCard);
      }
    this.updateSelectedCardIsActionCard()
    this.updateUseExpeditionCard();
    this.updateUseActionCard()
    }


  uMavailable() { // damit der upper market korrekt ausgewählt wird
    if (this.firstPurchase === false) {
      this.isFree = true; }
  }

  showMarketFunc() {
    if (this.showMarket === true) {
      this.showMarket = false;
    } else {
      this.checkIsFree();
      this.showMarket = true; }
  }

  buy() {
    this.firstPurchase = true;
    this.checkIsFree();
  }
  chooseMarketCard(event) { // chosenMarketCard erhält ID vom zuletzt ausgewählten Button
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    this.chosenMarketCard = idAttr.nodeValue;
  }

  constructor() { }

  ngOnInit() {
  }

}
