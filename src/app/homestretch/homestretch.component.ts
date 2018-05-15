import {HexagonBoardComponent} from '../hexagon-board/hexagon-board.component';
import {PlayerComponent} from '../player/player.component';
import {HexComponent} from '../hex/hex.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  OnInit,
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  QueryList,
  ElementRef, ViewChildren
} from '@angular/core';
import {User} from '../shared/models/user';

@Component({
  selector: 'app-homestretch',
  templateUrl: './homestretch.component.html',
  styleUrls: ['./homestretch.component.css']
})
export class HomestretchComponent implements OnInit, AfterViewInit {

  /*classe für click events...
  * */
  hex: HexComponent;
  empty: string;
  hello: any;
  players: PlayerComponent[] = [];
  hexMapById = new Map<string, HexComponent>();
  currentPlayer: any;
  numberPlayers: number;
  playerNames: string[];
  selectedHex: string;
  apiUrl = 'https://sopra-fs18-group13-server.herokuapp.com/Games/';
  currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
  playerName = JSON.parse(localStorage.getItem('currentUser')).name;
  [key: string]: any;
  blockade: any;
  Bstrenght: any;
  numberX: number;
  /*blockadeColour: string;
  //blockadeStrength: string;
  //api + game + spec + blockades
  */
  blockadestring: string[]= [];
  blockadelist: string[]= [];
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private http: HttpClient) { }
  @ViewChildren(HexComponent) divs: QueryList<HexComponent>;
  ngOnInit() {
    localStorage.removeItem('mode')

    for (let i = 0; i <= 4; i++) {
      this.blockadestring.push('blockade' + String(i));
    }
    console.log('this is list:', this.blockadelist);
    this.first = true;
    /*Adds players to Playercomponent list
    * -> now players holds all current players*/
    this.playerNames = JSON.parse(localStorage.getItem('playersInRoom'));
    console.log('playerNames:', this.playerNames);

    this.numberPlayers = this.playerNames.length;
    console.log('numberPlayers', this.numberPlayers)
    /*give the players their specific name*/
    const sample_players = ['player1', 'player2', 'player3', 'player4'];
    const twoPlayermode = ['player10', 'player11', 'player20', 'player21']
    /*only implement 2 players logic*/
    console.log('number:', this.numberPlayers)
    if (this.numberPlayers > 2) {
      for (let i = 0; i < this.numberPlayers; i++) {
        /*create a new playercomponent*/
        this.players.push(new PlayerComponent());
        this.players[i].playerId = sample_players[i];
      }}
    else{
      console.log('in else of players')
      localStorage.setItem('mode', 'true');
      for (let i = 0; i < 4; i++){
        this.players.push(new PlayerComponent());
        this.players[i].playerId = twoPlayermode[i];

      }
      console.log('players: ', this.players);
      console.log('hello world')
    }
    /*
    How many playing pieces should be displayed on the board as well as their initial positions*/
    /*if (this.numberPlayers > 2) {
      for (let i = 0; i < this.numberPlayers; i++) {
        this.players.push(new PlayerComponent());
        this.players[i].playerId = sample_players[i];
        this.players[i].position = 'B' + String(i + 1);
      }

      console.log('current players: ', this.players);


    }*/
    /*this.players.push(new PlayerComponent());
    this.players[0].playerId = sample_players[0];

    this.players.push(new PlayerComponent());
    this.players[1].playerId = sample_players[1];
    this.players[1].position = 'B2';
    this.players.push(new PlayerComponent());
    this.players[2].playerId = sample_players[2];
    this.players[2].position = 'B3';
    this.players.push(new PlayerComponent());
    this.players[3].playerId = sample_players[3];
    this.players[3].position = 'B4';*/


    // for (var position of positions){
    // document.getElementById (position).addEventListener ('click', function(){pos(position, sample_players); } , false); }

    /*this.positionService.fetchPosition().subscribe((data) => this.positions = data);*/


    /*function pos(moveposition, playerX) {
      /* alert('Hello! I am an alert box!!');
      console.log('insert'.concat(moveposition));
      const p4 = new PlayerComponent();
      const insert = 'insert'.concat(moveposition);
    /*@ViewChild(insert, {read: ViewContainerRef}) insert : ViewContainerRef;
      const componentFactory = this.componentFactoryResolver(p4);
    this.insert.clear();
    this.insert.createComponent(componentFactory);*/


    /*const innerHTMLContent = '<div class ="' + playerX[0] + '"></div>';
    const divIDToMove = 'move'.concat(position);
    console.log(innerHTMLContent, divIDToMove);
    const p4 = document.createElement('div');
    p4.className = 'player';
    p4.id = 'player4';
    document.getElementById(divIDToMove).appendChild(p4);
  }*/
    this.http.get(this.apiUrl + this.currentRoom + '/blockade')
      .subscribe(result => {
        const first = this.blockadestring[0];
        this[first] = 'hello';
        for (let i = 0; i < 4; i++) {
          const dummy = this.blockadestring[i];
          this[dummy] = result[i].name;
          /*this.Bstrenght[i] = result[i].strenght;*/
        }
        this.blockadelist.push(this.blockade0);
        this.blockadelist.push(this.blockade1);
        this.blockadelist.push(this.blockade2);
        this.blockadelist.push(this.blockade3);

        console.log('blockades', this.blockadelist);
      });


  }


  ngAfterViewInit() {
    // this.divs.forEach(div => console.log(div));
    const hex = this.divs.forEach(item => {
      this.hexMapById.set(item.hexId, item);
      if (['B9', 'B11'].includes(item.hexId)) {
        return true;
      }
      return false;
    });
    /**/
    /*highlights all potentialMoveIds*/
    console.log(this.hexMapById);
    /* this.setInitialPosition();
    /*this.players[this.currentPlayer].getPotentialMoveIds()
      .forEach(moveId => {
        this.hexMapById.get(moveId).onhightlight();
        /*this.hex.selectedTile(this.players[0].getPotentialMoveIds());
        console.log('standard getPotentialMoveIds', this.players[this.currentPlayer].getPotentialMoveIds());
      });*/
    // this.setInitialPosition();

  }


  /*
  this.hexMapById.get(this.players[0].position).addplayer(this.players[0]);
    this.hexMapById.get(this.players[1].position).addplayer(this.players[1]);
    this.hexMapById.get(this.players[2].position).addplayer(this.players[2]);
    /*this.hexMapById.get(this.players[3].position).addplayer(this.players[3]);*/


  addPlayers(selectedCard: any, possibleTiles: any) {
    console.log('standard component selected card: ' + selectedCard);
    if (localStorage.getItem('mode') === 'true'){
      this.currentPlayer = localStorage.getItem('currentTwoPlayer');
      console.log('i am current: ', this.currentPlayer)
    } else {
      this.currentPlayer = localStorage.getItem('currentPlayer');
      console.log('currentPlayer: ', this.currentPlayer);
      console.log('possibleTiles value', possibleTiles);
    }

    if (possibleTiles.length <= 0){} else {

      // addPlayers(selected: Array<string>) {
      if (this.blockadelist.indexOf(JSON.parse(localStorage.getItem('selectedHex'))) > -1) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })};
        this.selectedHex = JSON.parse(localStorage.getItem('selectedHex'));

        /*
        Send blockade to backend*/
        console.log('send to backend: ', this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + selectedCard + '/blockade');
        this.http.put(this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + selectedCard + '/blockade', httpOptions).subscribe((result => console.log('result api crossblockade', result)));
        const element = document.getElementById(JSON.parse(localStorage.getItem('selectedHex')));
        (<HTMLElement>element).remove()
        this.removeChild(element);
      }
      else {
        this.tile = JSON.parse(localStorage.getItem('selectedHex'))
        this.tile2 = this.tile.replace(/['"]+/g, '');
        console.log(this.tile2)
        // TO DO eventually need an if for 2 player mode
        console.log('currentPlayer: ', this.currentPlayer)
        if (localStorage.getItem('mode') === 'true') {
          for (let i = 0; i < 4; i ++) {
            if (this.players[i].playerId === this.currentPlayer){
              this.numberX = i;}
            console.log('position of player: ', this.numberX)
          }
          console.log('playernumber', this.players[this.numberX])
          this.hexMapById.get(this.players[this.numberX].position).removePlayer();
          this.players[this.numberX].position = JSON.parse(localStorage.getItem('selectedHex'));

          console.log(localStorage.getItem('selectedHex'))
          this.hexMapById.get(JSON.parse(localStorage.getItem('selectedHex'))).addplayer(this.players[this.numberX], this.tile2, selectedCard);


        } else {


          console.log('BUG?', this.players[this.currentPlayer])
          console.log('position to remove: ', this.players[this.currentPlayer].position)
          this.hexMapById.get(this.players[this.currentPlayer].position).removePlayer();
          this.players[this.currentPlayer].position = JSON.parse(localStorage.getItem('selectedHex'));
          /*WORKS: console.log('in addPlayers', this.players[this.currentPlayer].position)*/
          /*WORKS: console.log('should work', localStorage.getItem('currentTile')); first time gives initial position back.*/
          // localStorage.removeItem('currentTile');
          /*WORKS: console.log('shouldnt work', localStorage.getItem('currentTile'));*/
          console.log('i am in else of addplayer')
          // localStorage.setItem('currentTile', this.players[this.currentPlayer].position);
          /*WORKS: console.log(localStorage.getItem('currentTile'))*/

          console.log('JSON', JSON.parse(localStorage.getItem('selectedHex')))
          this.hexMapById.get(JSON.parse(localStorage.getItem('selectedHex'))).addplayer(this.players[this.currentPlayer], this.tile2, selectedCard);
          console.log('should be new position', localStorage.getItem('currentTile'));
        }
      }

    }}

  showTiles(Tiles: any) {
    for (const tile of Tiles){
      console.log('tile: ', tile);
      this.hexMapById.get(tile).onhightlight();
    }}
  removeTiles(Tiles: any){
    for (const tile of Tiles) {
      console.log('in remove tiles with tiles:', Tiles)
      this.hexMapById.get(tile).removehightlight();

    }}
  updatePosition(oldarray: any, newarray: any) {
    // console.log('in update');
    /*currently only for NOT 2players logic*/
    if (this.numberPlayers > 2) {
      for (let i = 0; i < this.numberPlayers; i++) {
        /*assign the the value of newarray*/
        this.players[i].position = newarray[i];
      }}
    else {
      for (let i = 0; i < 4; i++) {
        /*assign the the value of newarray*/
        this.players[i].position = newarray[i];
      }
    }
    // console.log('old', oldarray);
    // console.log('new', newarray) ;

    for (let i = 0; i < newarray.length; i++) {
      // console.log(newarray[i]);
      // console.log('this.players[i]', this.players[i]);
      /*only removeplayers if they change position*/
      this.empty = 'false';
      if (oldarray.length === 0) {
        this.currentkey = String(i) + 'st'
        localStorage.removeItem(this.currentkey + 'st');
        this.hexMapById.get(newarray[i]).addplayer(this.players[i], newarray[i], this.empty);
        localStorage.setItem(this.currentkey, newarray[i]);
        console.log('currentkey', this.currentkey, 'currentVal', localStorage.getItem(this.currentkey)}
      else {
        if ( oldarray[i] !== newarray[i]){
          this.currentkey = String(i) + 'st'
          localStorage.removeItem(this.currentkey + 'st');
          localStorage.setItem(this.currentkey, newarray[i]);
          console.log('currentkey', this.currentkey, 'currentVal', localStorage.getItem(this.currentkey))
          console.log('in else/if old: ', oldarray[i]),
            console.log('in else/if new: ', newarray[i])
          // localStorage.setItem('currentTile', newarray[i]);
          /*remove player form hex component and then add them to the new positions.*/
          this.hexMapById.get(oldarray[i]).removePlayer();
          console.log('this will be the player added: ', this.players[i])
          this.hexMapById.get(newarray[i]).addplayer(this.players[i], newarray[i], this.empty);}
        else {}
      }
    }
  }



  getPlayerPosition(playerId: string, position: string) {

  }
  /*BACKEND Probabely need notion of current player*/
  updatePlayers(position: string) {

    console.log(this.players[this.currentPlayer]);

    /*this.hexMapById.get(position).addplayer(this.players[this.currentPlayer]);*/
  }


  mouseEnter(div: string) {
    console.log('mouse enter standard : ' + div);
  }

  mouseLeave(div: string) {
    console.log('mouse leave standard :' + div);
  }






}



