import {Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {StandardComponent} from '../standard/standard.component';
import {PlayerComponent} from '../player/player.component';
import {HexComponent} from '../hex/hex.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {WinScreenComponent} from '../win-screen/win-screen.component';

import {RoomService} from '../shared/services/room.service';
import 'rxjs/add/operator/takeWhile';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {el} from '@angular/platform-browser/testing/src/browser_util';

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
  isItMyTurn: boolean;
  isItMyTurnCopy: boolean;
  trashButtonClickable: boolean;



  currentHandCardObject: object;

  marketCardsObject: object;
  random: number;
  public idx: number;
  playersInRoom: string[];
  possibleTiles: string[];
  currentPositions: string[];
  oldPositions: string[];
  opponents: string[];
  myColor: string;

  display: boolean;
  alive: boolean;
  interval: number;
  testArray: any[];

  playerColors = ['red', 'white', 'blue', 'yellow'];

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

  // selected: string[];

  // für useActionCard und useExpeditionCard verwendet
  actionCards = [
    'Cartographer',
    'Compass',
    'Natives',
    'Scientist',
    'Transmitter',
    'TravelDiary'
  ];

  moveActionCards = [
    'Natives'
  ];


  drawActionCards = [
    'Cartographer',
    'Compass',
    'Scientist',
    'TravelDiary'
  ];

  /*
  drawActionCardsDict = [
    {cardID: 'Scientist', maxCardsToBeTrashed : 1},
    {cardID: 'TravelDiary', maxCardsToBeTrashed: 2},
    {cardID: 'Compass', maxCardsToBeTrashed: 0},
    {cardID: 'Cartographer', maxCardsToBeTrashed: 0},
  ]; */

  marketActionCards = [
    'Transmitter'
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

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })};


  // liste der angekreuzten handcards
  selected = [];

  selectedCards = 0; // anzahl ausgewählte handcards


  constructor(private roomService: RoomService, private http: HttpClient) {
    this.possibleTiles = new Array<string>();
    this.currentPositions = new Array<string>();
    this.oldPositions = new Array<string>();
    this.opponents = new Array<string>();
    this.playersInRoom = new Array<string>();
    this.display = false;
    this.alive = true;
    this.interval = 1000;
    this.isItMyTurn = false;
    this.isItMyTurnCopy = false;
    this.trashButtonClickable = true;
  }



  // überprüft wie viele karten im lower market sind
  checkIsFree() {
    this.http.get(this.apiUrl + this.currentRoom + '/CurrentBottom')
      .subscribe(result => {
        console.log(result);
        if (result !== 6) {
          this.isFree = false; } else {this.isFree = true; }
        if (this.firstPurchase === true) {
          this.isFree = true; }
      });
  }

  // updated clickable status der buttons unten links
  updateSelectedCardIsActionCard() {
    for (this.i = 0; this.i < 6; this.i++) {
      if (this.selectedCards[0] === this.actionCards[this.i]) {
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
  updateBuyAvailable() {
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
      console.log('selected', this.selected);
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
    console.log(this.chosenMarketCard);
    for (let key in this.lowerCards) {
        console.log(this.lowerCards[key].cardID);
        console.log(this.lowerCards[key].cardID === this.chosenMarketCard);
    }
  }
   /* return this.http.get(this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + this.selected + '/move')
      .subscribe(result => {
        for (const el in result) {
          this.possibleTiles.push(result[el].name);
        }
        console.log(this.possibleTiles);
      });*/


  discardCards() {
    const bodyString = JSON.stringify({cards: this.selected});
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};
    console.log(this.apiUrl + this.currentRoom + '/' + this.playerName + '/discard');
    this.http.post(this.apiUrl + this.currentRoom + '/' + this.playerName + '/discard', bodyString, httpOptions)
      .subscribe(result => console.log(result));
    this.updateHandcards();
    this.selected = [];
  }


  endturnFunction() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};
    this.isItMyTurn = false;
    this.firstPurchase = false;
    this.http.put(this.apiUrl + this.currentRoom + '/' + this.playerName + '/endturn', httpOptions).
      subscribe(result => console.log(result));
    this.updateHandcards();
    this.updateHandcards();
    this.updateHandcards();
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
    this.http.post(this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + this.chosenMarketCard, bodyString, httpOptions)
      .bufferTime(1000)
      .subscribe(result => console.log(result));
    console.log('you selected: ' + this.selected);
    this.updateHandcards();
    this.updateHandcards();
    this.selected = [];
    for (let key in this.lowerCards) {
      // decrease number of cards of specific type left
      if (this.lowerCards[key].cardID === this.chosenMarketCard) {
        let temp = Number(this.lowerCards[key].left);
        if (temp > 0) {
          temp--;
          this.lowerCards[key].left = temp.toString();
          break;
        }
      }
    }
  }


  // updatet chosenMarketCard
  chooseMarketCard(event) { // chosenMarketCard erhält ID vom zuletzt ausgewählten Button
    const target = event.target || event.srcElement || event.currentTarget;
    const idAttr = target.attributes.id;
    this.chosenMarketCard = idAttr.nodeValue;
    this.updateBuyAvailable();
  }



  updateHandcards() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};
    this.http.get(this.apiUrl + this.currentRoom + '/' + this.playerName + '/handcards', httpOptions)
      .subscribe(result => {
        this.currentHandCardObject = result;
        this.handCards = [];
        for (let i = 0; i < Object.keys(result).length; i++) {
          this.handCards.push({cardClass: (this.currentHandCardObject[i]).name, checked: false });
        }
      });
  }


  movePlayer() {
    console.log('entered mov');
    console.log('possible tiles in movePlayer', JSON.parse(localStorage.getItem('currentTiles')));
    // TODO addPlayers() doesn't work yet
    // console.log(this.standard.addPlayers());
    this.standard.addPlayers(this.selected);
    this.updateHandcards();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};
    this.selected = [];
    /*this.http.put(this.apiUrl + this.currentRoom + '/' + this.playerName + localStorage.getItem('currentTile'), null, httpOptions);*/

      /*console.log(this.boards[0](this.hex.currenthexselection));*/

    }


  ngOnInit() {
    localStorage.removeItem('possibleTiles');

    // Here we determine whether it's the player's turn
    TimerObservable.create(0, this.interval)  // This executes the http request at the specified interval
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.http.get(this.apiUrl + this.currentRoom + '/currentPlayer')
          .subscribe(result => {
            for (let key in result) {
              if (key === 'name') {
                this.current_player = result[key];
                // console.log('the current_player = ' + this.current_player);
                // console.log('is it my turn?: ' + this.isItMyTurn);
                // here we check whether it's actually the player's turn
                if (this.playerName === this.current_player) {
                  this.isItMyTurn = true;
                } else {
                  this.isItMyTurn = false;
                }
              }
            }
          });
      });
    console.log('got current User: ', localStorage.getItem('currentUser'));
    // here we get the current player from heroku in realtime
    TimerObservable.create(0, this.interval)  // This executes the http request at the specified interval
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.http.get(this.apiUrl + this.currentRoom + '/currentPlayer')
          .subscribe(result => {
            for (let key in result) {
              if (key === 'name') {
                this.current_player = result[key];
                // console.log('dieser spieler ist an der reihe: ' + this.current_player);
              }
            }});
      });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};


    // here we get all players of the current room from heroku
    this.roomService.getRooms(this.currentRoom).subscribe(data => {
      this.playerObject = data.players;
      for (const idx in this.playerObject) {
        this.playersInRoom.push((this.playerObject[idx]).name);
        if (this.playerName === (this.playerObject[idx]).name) {
          this.myColor = this.playerColors[idx];
          console.log('you are the player at position: ' + idx);
          localStorage.setItem('currentPlayer', idx)
          console.log('you have color: ' + this.myColor);
        }
        // here we push the usernames of all opponents in the room into the list of opponents
        if (this.playerName !== (this.playerObject[idx]).name) {
          this.opponents.push((this.playerObject[idx]).name);
        }
      }
      localStorage.setItem('playersInRoom', JSON.stringify(this.playersInRoom));
    });



    // here we get the handcards from heroku upon init
    this.http.put(this.apiUrl + this.currentRoom + '/' + this.playerName + '/turn', null, httpOptions).subscribe(result => {
      this.handCardObject = result;
      for (let i = 0; i < 4; i++) {
        this.handCards[i].cardClass = (this.handCardObject[i]).name;
      }
    });


    /*TimerObservable.create(0, this.interval)  // This executes the http request at the specified interval
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.http.get(this.apiUrl + this.currentRoom + '/' + this.playerName + '/handcards', httpOptions)
          .subscribe(result => {
            this.currentHandCardObject = result;
            this.handCards = [];
            this.testArray = [];
            for (let i = 0; i < Object.keys(result).length; i++) {
              this.testArray.push({cardClass: (this.currentHandCardObject[i]).name, checked: false });
              this.handCards.push({cardClass: (this.currentHandCardObject[i]).name, checked: false });
              // this.handCards[i].cardClass = (this.currentHandCardObject[i]).name;
            }
          });
      });*/
    // update playing piece positions:
    console.log('try for users', this.http.get(this.apiUrl + this.currentRoom, httpOptions));
    TimerObservable.create(0, this.interval)  // This executes the http request at the specified interval
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.http.get(this.apiUrl + this.currentRoom + '/users', httpOptions)
          .subscribe(result => {
            console.log('result', result);
            /*first assign all positions before update to the array old positions*/
            this.oldPositions = [];
            for (let x of this.currentPositions){
              this.oldPositions.push(x);
            }
            this.currentPositions = [];
            console.log('new', this.currentPositions);
            /*push the positions from the backend to the array currentPositions*/
            for (let key in result) {
              this.currentPositions.push(result[key].myFigure.currentPosition.name);
            }
            console.log('new after push', this.currentPositions);
            });
          /* WORKS: console.log('current positons:', this.currentPositions);*/
          /*make an update call only if there has been a change between the old and the new positions*/
              this.standard.updatePosition(this.oldPositions, this.currentPositions);
        }
            );


  }



  // here we get the current market upon clicking marketplace buttoon
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
            this.upperCards[this.idx].left = result[key][key2];
            if (result[key][key2] === 0) {
              this.upperCards[this.idx].cardID = 'Backside';  // this would display the backside of a card
            } else {
              this.upperCards[this.idx].cardID = key2;
            }
          } else {
            this.lowerCards[this.idx].left = result[key][key2];
            if (result[key][key2] === 0) {
              this.lowerCards[this.idx].cardID = 'Backside';
            } else {
              this.lowerCards[this.idx].cardID = key2;
            }
          }
        }
      }
      this.marketCardsObject = result;
    });
  }


  playActionCard() {
    if (this.drawActionCards.includes(this.selected[0])) {
      console.log('yaaaay');
      this.playDrawActionCard(this.selected[0]);
    } else if (this.moveActionCards.includes(this.selected[0])) {
      this.playMoveActionCard();
    } else if (this.marketActionCards.includes(this.selected[0])) {
      this.playMarketActionCard();
    }
  }


  playDrawActionCard(drawActionCard: string) {
    // draw a new card from draw pile
    console.log('playActionCard');
    this.http.put(this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + drawActionCard + '/drawAction', this.httpOptions).subscribe(result => console.log(result));
    if (drawActionCard === 'Scientist' || drawActionCard === 'TravelDiary') {
      this.trashButtonClickable = false;
    }
    this.trashButtonClickable = true;
  }

  playMoveActionCard() {

  }

  playMarketActionCard() {

  }



  ngOnDestroy() {
    this.alive = false; // switches your TimerObservable off
  }


}
