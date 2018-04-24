import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {StandardComponent} from '../standard/standard.component';
import {PlayerComponent} from '../player/player.component';
import {HexComponent} from '../hex/hex.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {RoomService} from '../shared/services/room.service';


@Component({
  selector: 'app-in-game-screen',
  templateUrl: './in-game-screen.component.html',
  styleUrls: ['./in-game-screen.component.css']
})

export class InGameScreenComponent implements OnInit {
  @ViewChild(StandardComponent) standard: StandardComponent;
  boards = [StandardComponent];
  player: PlayerComponent;
  currentselection: string;
  currentRoom: string;
  current = 'Player1';
  apiUrl: string;
  room_name: string;
  playerObject: object;
  handCardObject: object;
  marketCardsObject: object;
  random: number;
  public idx: number;
  apiUrl: string;

  playerName = 'Your name'; // later replace with this.username or whatever works

  // wenn lower market 6 karten hat ist isfree = false
  isFree = false;
  // wenn der user noch keinen kauf gemacht hat ist firstpurchase = false
  firstPurchase = false;

  // für show market button
  showMarket = false;
  // wird bei buy card mitgegeben
  chosenMarketCard = '';

  // für button unten links, kontrolliert clickable status
  i = 0;
  useActionCard = true;
  useExpeditionCard = true;
  // trash = true;
  buyAvailable = true;
  discard = true;

  // für useActionCard und useExpeditionCard verwendet
  actionCards = [
    'cartographer',
    'compass',
    'native',
    'scientist',
    'transmitter',
    'travel-log'
  ];
  selectedCardIsActionCard = false;

  // hier werden die upper market cards eingelesen
  upperCards = [
    {cardID: 'Cartographer', left: '3'},
    {cardID: 'Compass', left: '3'},
    {cardID: 'Natives', left: '3'},
    {cardID: 'Scientist', left: '3'},
    {cardID: 'Transmitter', left: '3'},
    {cardID: 'TravelDiary', left: '3'},
    {cardID: 'Sailor', left: '3'},
    {cardID: 'Captain', left: '3'},
    {cardID: 'Explorer', left: '3'},
    {cardID: 'Scout', left: '3'},
    {cardID: 'Trailblazer', left: '3'},
    {cardID: 'Pioneer', left: '3'}
  ];

  // hier werden die lower market cards eingelesen
  lowerCards = [
    {cardID: 'GiantMachete', left: '3'},
    {cardID: 'Allrounder', left: '3'},
    {cardID: 'Adventurer', left: '3'},
    {cardID: 'Plane', left: '3'},
    {cardID: 'Traveler', left: '3'},
    {cardID: 'Photographer', left: '3'}
  ];

  // hier werden die handcards des spielers eingelesen
  handCards = [
    {cardClass: 'Sailor', checked: false },
    {cardClass: 'Explorer', checked: false},
    {cardClass: 'Traveler', checked: false},
    {cardClass: 'Traveler', checked: false}
  ];

  // liste der angekreuzten handcards
  selected = [];
  selectedCards = 0; // anzahl ausgewählte handcards

  opponent1 = 'Opponent 1 name';
  opponent2 = 'Opponent 2 name';
  opponent3 = 'Opponent 3 name';

  opponents_list = [this.opponent1, this.opponent2, this.opponent3];




  // überprüft wie viele karten im lower market sind
  checkIsFree() {
    if (this.lowerCards.length !== 6) {
      this.isFree = false; }
    else {this.isFree = true; }
    if (this.firstPurchase === true) {
      this.isFree = true; }
  }

  // updated clickable status der buttons unten links
  updateSelectedCardIsActionCard() {
    for (this.i = 0; this.i < 6; this.i++){
      if (this.selectedCards[0] === this.actionCards[this.i]){
        this.selectedCardIsActionCard = true;
        return;
      }
    }
    this.selectedCardIsActionCard = false;
  }
  updateUseActionCard() {
    if (this.selectedCards === 1 && this.selectedCardIsActionCard === true) {
      this.useActionCard = false;
    } else
      this.useActionCard = true;
  }
  updateUseExpeditionCard() {
    if (this.selectedCards === 1 && this.selectedCardIsActionCard === false) {
      this.useExpeditionCard = false;
    } else {
      this.useExpeditionCard = true;
    }
  }
  updateBuyAvailable(){
    if (this.selectedCards >= 1 && this.chosenMarketCard !== '' && this.firstPurchase === false){
      this.buyAvailable = false;
    }
    else {
      this.buyAvailable = true;
    }
  }
  updateDiscard() {
    if (this.selectedCards >= 1) {
      this.discard = false;
    }
    else {
      this.discard = true;
    }
  }

  unavailable() { // damit der upper market korrekt ausgewählt wird
    if (this.firstPurchase === false) {
      this.isFree = true;
    }
  }
  // aktionen die ausgeführt werden wenn eine handcard aus- / abgewählt wird
  toggleHandSelection(card, i) { // = toggleSelection(user) ist noch fehlerhaft
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
    this.updateSelectedCardIsActionCard();
    this.updateUseActionCard();
    this.updateUseExpeditionCard();
    this.updateBuyAvailable();
    this.updateDiscard();
    }



  // toggelt die marktbuttons
  showMarketFunc() {
    if (this.showMarket === true) {
      this.showMarket = false;
    } else {
      this.checkIsFree();
      this.showMarket = true; }
  }
  selection(selectedTile: string) {
    this.currentselection = selectedTile;
  }

  // füllt das upperCards Array
  getUpperCards(upperCardsJson) {
    this.upperCards = [];
    for (const key in upperCardsJson) {
      const upCard = {cardID: key, left: upperCardsJson[key]};
      this.upperCards.push(upCard);
      }
  }

  // füllt das lowerCards Array
  getLowerCards(lowerCardsJson) {
    this.lowerCards = [];
    for (const key in lowerCardsJson) {
      const upCard = {cardID: key, left: lowerCardsJson[key]};
      this.lowerCards.push(upCard);
    }
  }

  // kaufinteraktionen, mit buy button verbunden
  buy() {
    this.firstPurchase = true;
    this.checkIsFree();
  }

  // updatet chosenMarketCard
  chooseMarketCard(event) { // chosenMarketCard erhält ID vom zuletzt ausgewählten Button
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    this.chosenMarketCard = idAttr.nodeValue;
    this.updateBuyAvailable();
  }

  movePlayer() {
    console.log('entered mov');
    console.log(this);
    console.log(this.standard.addPlayers());
    this.standard.addPlayers();
    /*console.log(this.boards[0](this.hex.currenthexselection));*/
    }


  constructor(private roomService: RoomService, private http: HttpClient) {
    this.apiUrl = 'https://sopra-fs18-group13-server.herokuapp.com/Games/';
  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};

    this.playerName = JSON.parse(localStorage.getItem('currentUser')).name;
    console.log('welcome ' + this.playerName);
    this.currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
    console.log(this.apiUrl);
    console.log('this.playerName: ' + this.playerName);
    console.log('this.currentRoom: ' + this.currentRoom);
    console.log(this.apiUrl + this.currentRoom + '/' + this.playerName);
    console.log('this is the market url: ' + this.apiUrl + this.currentRoom + '/market');







    // this.roomService.getRooms().subscribe(data => console.log((data[0]).players));
    this.roomService.getRooms().subscribe(data => { // TODO pass this.apiUrl into getRooms()
      this.playerObject = (data[0]).players; // TODO change this upon getting only information from specific room

      this.random = this.playerObject.length;

      for (let i=0; i<this.playerObject.length; i++) {
        // console.log((this.playerObject[i]).name);
        this.opponents_list[i] = (this.playerObject[i]).name;
      }
      console.log(this.opponents_list);
      console.log(localStorage);

    });

    // TODO implement dynamic link

    this.http.put(this.apiUrl + this.currentRoom + '/' + this.playerName + '/turn', null, httpOptions).subscribe(result => {
      console.log(result);
      this.handCardObject = result;
      console.log('HandCardsObject: ' + this.handCardObject[0]);

      console.log('handCardsObject' + this.handCardObject);
      for (let i = 0; i < 4; i++) {
        // console.log((this.playerObject[i]).name);
        this.handCards[i].cardClass = (this.handCardObject[i]).name;
      }
    });
  }

  // TODO implement dynamic link
  getCurrentMarket() {
    this.idx = -1;
    this.http.get(this.apiUrl + this.currentRoom + '/market').subscribe(result => {
      // console.log(result);

      for (let key in result) { // This is how we assign the information about cards from heroku to our upperCards and lowerCards
        for (let key2 in result[key]) {
          if (this.idx === 11) {
            this.idx = 0;
          }else {
            this.idx += 1;
          }
          if (key === 'upperdict') {
            this.upperCards[this.idx].cardID = key2;
          } else {
            this.lowerCards[this.idx].cardID = key2;
          }
        }
      }



      this.marketCardsObject = result;
      // console.log('upperCardsObject: ' + this.marketCardsObject);
    });



    // console.log(this.upperCards);
    // console.log(this.lowerCards);

  }


}

