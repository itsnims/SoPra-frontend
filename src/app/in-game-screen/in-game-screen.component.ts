import {Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {StandardComponent} from '../standard/standard.component';
import {PlayerComponent} from '../player/player.component';
import {HexComponent} from '../hex/hex.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';

import {RoomService} from '../shared/services/room.service';
import 'rxjs/add/operator/takeWhile';
import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-in-game-screen',
  templateUrl: './in-game-screen.component.html',
  styleUrls: ['./in-game-screen.component.css']
})

export class InGameScreenComponent implements OnInit, OnDestroy {
  @ViewChild(StandardComponent) standard: StandardComponent;
  boards = [StandardComponent];
  player: PlayerComponent;
  currentselection: string;
  current = 'Player1';
  room_name: string;

  playerObject: object;
  handCardObject: object;
  current_player: string;
  isItMyTurn = false;


  marketCardsObject: object;
  random: number;
  public idx: number;
  playersInRoom: string[];
  possibleTiles: string[];
  opponents: string[];

  display: boolean;
  alive: boolean;
  interval: number;

  apiUrl = 'https://sopra-fs18-group13-server.herokuapp.com/Games/';
  currentRoom = JSON.parse(localStorage.getItem('currentRoom'));

  playerName = JSON.parse(localStorage.getItem('currentUser')).name;


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


  constructor(private roomService: RoomService, private http: HttpClient) {
    this.possibleTiles = new Array<string>();
    this.opponents = new Array<string>();
    this.playersInRoom = new Array<string>();
    this.display = false;
    this.alive = true;
    this.interval = 1000;
  }




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
    if (this.selectedCards >= 1 && this.chosenMarketCard !== '' && this.firstPurchase === false) {
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
      this.possibleTiles = [];
      localStorage.removeItem('possibleTiles');
      /*console.log('on if condition', this.possibleTiles)*/
      this.handCards[i].checked = false;
      const position = this.selected.indexOf(newCard);
      this.selectedCards--;
      this.selected.splice(position, 1);
    }
    else {
      this.possibleTiles = [];
      localStorage.removeItem('possibleTiles');
      /* WORKS # local storage gets deleted console.log('shouldnotwork', localStorage.getItem('possibleTiles'));*/
      this.handCards[i].checked = true;
      this.selectedCards++;
      this.selected.push(newCard);
      /**/
      console.log('selected', this.selected);
      /*problem where is the notion of currenttile???????*/
      console.log('get call', this.http.get(this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + this.selected + '/move'));
      return this.http.get(this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + this.selected + '/move')
        .subscribe(result => {
          for (const el in result) {
            console.log('log result', result);
            this.possibleTiles.push(result[el].name);
          }
          console.log('possible tiles in else', this.possibleTiles);
          localStorage.setItem('possibleTiles', JSON.stringify(this.possibleTiles));
          console.log('current local storage with JSON', JSON.parse(localStorage.getItem('possibleTiles')));


        });
      }

    this.updateSelectedCardIsActionCard();
    this.updateUseActionCard();
    this.updateUseExpeditionCard();
    this.updateBuyAvailable();
    this.updateDiscard();
    /**/

    /**/
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

  showSelected() {
    console.log(this.selected);
    console.log(this.chosenMarketCard);
   /* return this.http.get(this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + this.selected + '/move')
      .subscribe(result => {
        for (const el in result) {
          this.possibleTiles.push(result[el].name);
        }
        console.log(this.possibleTiles);
      });*/
  }

  discardCards() {
    const bodyString = JSON.stringify({cards: this.selected});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};
    return this.http.post(this.apiUrl + this.currentRoom + '/' + this.playerName + '/discard', bodyString, httpOptions)
      .subscribe(result => console.log(result));
  }



  // kaufinteraktionen, mit buy button verbunden
  buy() {
    this.firstPurchase = true;
    this.checkIsFree();

    const bodyString = JSON.stringify({cards: this.selected});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};
    return this.http.post(this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + this.chosenMarketCard, bodyString, httpOptions)
      .subscribe(result => console.log(result));
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
    console.log('possible tiles in movePlayer', JSON.parse(localStorage.getItem('currentTiles')));
    console.log('')
    // TODO addPlayers() doesn't work yet
    // console.log(this.standard.addPlayers());
    this.standard.addPlayers();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};

    /*this.http.put(this.apiUrl + this.currentRoom + '/' + this.playerName + localStorage.getItem('currentTile'), null, httpOptions);*/

      /*console.log(this.boards[0](this.hex.currenthexselection));*/

    }



  ngOnInit() {
    localStorage.removeItem('possibleTiles');



    /*
    this.http.get('https://sopra-fs18-group13-server.herokuapp.com/Games/Game/currentPlayer')
      .subscribe(result => {
        for (let key in result) {
          if (key === 'name') {
            this.current_player = result[key];
            console.log('dieser spieler ist an der reihe: ' + this.current_player);
          }
        }

    TimerObservable.create(0, this.interval)  // This executes the http request at the specified interval
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.http.get(this.apiUrl + this.currentRoom + '/currentPlayer')
          .subscribe(result => {
            for (let key in result) {
              if (key === 'name') {
                this.current_player = result[key];
                console.log('the current_player = ' + this.current_player);
                console.log('is it my turn?: ' + this.isItMyTurn);
                if (this.playerName === this.current_player) {
                  console.log('IT IS YOUR TURN!!');
                }
              }
            }
          });
      });*/


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};

    console.log('welcome ' + this.playerName);
    console.log(this.apiUrl);
    console.log('this.playerName: ' + this.playerName);
    console.log('this.currentRoom: ' + this.currentRoom);
    console.log(this.apiUrl + this.currentRoom + '/' + this.playerName);
    console.log('this is the market url: ' + this.apiUrl + this.currentRoom + '/market');

    // here we get all players of the current room from heroku
    this.roomService.getRooms(this.currentRoom).subscribe(data => {
      this.playerObject = data.players;


      for (const idx in this.playerObject) {
        this.playersInRoom.push((this.playerObject[idx]).name);
        // here we push the usernames of all opponents in the room into the list of opponents
        if (this.playerName !== (this.playerObject[idx]).name) {
          this.opponents.push((this.playerObject[idx]).name);
        }
      }
      console.log('these are the players in the room: ' + this.playersInRoom);
      localStorage.setItem('playersInRoom', JSON.stringify(this.playersInRoom));
    });



    // here we get the handcards from heroku
    this.http.put(this.apiUrl + this.currentRoom + '/' + this.playerName + '/turn', null, httpOptions).subscribe(result => {
      this.handCardObject = result;
      for (let i = 0; i < 4; i++) {
        this.handCards[i].cardClass = (this.handCardObject[i]).name;
      }
    });
  }

  // here we get the current
  getCurrentMarket() {
    this.idx = -1;
    this.http.get(this.apiUrl + this.currentRoom + '/market').subscribe(result => {
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
  }
  ngOnDestroy() {
    this.alive = false; // switches your TimerObservable off
  }
}

