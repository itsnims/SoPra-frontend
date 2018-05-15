import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PlayerComponent} from '../player/player.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-hex',
  templateUrl: './hex.component.html',
  styleUrls: ['./hex.component.css']
})
export class HexComponent implements OnInit {
  @Input() hexId: string;
  @Input() colourclass: string;
  @Input() strengthId: string;
  @Input() blockade: string;
  opacity  = 1;
  value = false;
  tileColor: string;
  @Input() player: PlayerComponent = null;
  /*BACKEND current tiles*/
  clickables: string[];

  apiUrl = 'https://sopra-fs18-group13-server.herokuapp.com/Games/';
  currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
  playerName = JSON.parse(localStorage.getItem('currentUser')).name;
  tile2: string;
  execute: number;
  twoplayer: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }
  /*Sets truth false value according to what u click*/
  public clickTile(id) {
    String(id);
    console.log('click id:', id);
    this.clickables = JSON.parse(localStorage.getItem('possibleTiles'));
    console.log('clickables in tile', this.clickables);
    if (this.clickables.indexOf(id) !== -1) {
      return true;
    }
    return false;
    }
/*Uses clickTile to determine if a tile is clickable.*/
  clicked() {
    this.twoplayer = false;
    if (localStorage.getItem('mode') === 'true' ) {
      for (let i = 0; i < 4; i++) {
        let check = String(i) + 'st';
        console.log('clicked hex', this.hexId)
        console.log('to check', check)
        console.log('localget', localStorage.getItem(check));
        if (localStorage.getItem(check) === this.hexId) {
          localStorage.removeItem('currentTwoPlayer');
          this.execute = i;
          this.twoplayer = true;
        }
      }
    }
      if (this.twoplayer) {
        if (this.execute === 0) {
          console.log('in 10')
          localStorage.setItem('currentTwoPlayer', 'player10');
        }
        if (this.execute === 1) {
          console.log('in 11');
          localStorage.setItem('currentTwoPlayer', 'player11');
        }

        if (this.execute === 2) {
          console.log('in 20')
          localStorage.setItem('currentTwoPlayer', 'player20');
        }
        if (this.execute === 3) {
          console.log('in 21')
          localStorage.setItem('currentTwoPlayer', 'player21');
        }
      } else {
      if (this.clickTile(this.hexId)) {
        console.log(this.hexId, 'was clicked');
        this.selectedTile(this.hexId);
        localStorage.removeItem('selectedHex');
        localStorage.setItem('selectedHex', JSON.stringify(this.hexId));

      }


      console.log()

    }
  }
  public onhightlight() {
    console.log('i am here')
    this.opacity = 0.5;
  }
  public removehightlight() {
    this.opacity = 1;
  }

  mouseEnter(div: string) {
    console.log('mouse enter : ', this.hexId);
    this.removehightlight();
  }

  mouseLeave(div: string) {
    console.log('mouse leave :', this.hexId);
  }
  /*updateMe(updateVal:any, check:boolean) {
    if check {

    }
    this.someProperty = updateVal;
  }*/

  hasPlayer() {
    return !(this.player === null);
  }

  // for printing
  getPlayerId() {
    if (this.hasPlayer()) {
      return this.player.playerId;
    }
    // ugly default behaviour
    return '';
  }

  addplayer(p: PlayerComponent, tile: any, card: any) {
    console.log('hex component card: ' + card);
    this.player = p;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    if (card === 'false') {
    } else {

      if (localStorage.getItem('mode') === 'true') {
        console.log('currentID', this.player.playerId)

        if (this.player.playerId === 'player10' || this.player.playerId === 'player20') {
          console.log('for players /one', ' + ', tile)
          this.http.put(this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + card + '/' + tile + '/one', httpOptions)
            .subscribe(result => console.log('result form hex', result));
        } else {
          console.log('tile', tile)

          this.http.put(this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + card + '/' + tile + '/two', httpOptions)
            .subscribe(result => console.log('result form hex', result));
        }
      }
      else {
        console.log('tile', tile)
        console.log('card: ', String(tile))
        this.tile2 = tile.replace(/['"]+/g, '');
        console.log('tile', this.tile2)
        console.log('clickables in addplayer', this.clickables)
        console.log('put to backend: ', this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + card + '/' + tile)
        // console.log('buggy', localStorage.getItem(('currentTile')))

        this.http.put(this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + card + '/' + tile, httpOptions)
          .subscribe(result => {
            for (const key in result) {
              if (key === 'Color') {
                localStorage.setItem('tileColor', String(result[key]));
              }
            }
            for (const key in result) {
              if (key === 'strenght' && localStorage.getItem('tileColor') === 'Camp') {
                localStorage.setItem('tileStrength', String(result[key]));
                alert('you have to trash ' + result[key] + ' card(s)'); // TODO show how many
              }
              if (key === 'strenght' && localStorage.getItem('tileColor') === 'White') {
                localStorage.setItem('tileStrength', String(result[key]));
                alert('you have to discard ' + result[key] + ' card(s)'); // TODO show how many
              }
            }
          })
      }
    }
  }

  removePlayer() {
    this.player = null;
    localStorage.removeItem('tileColor');
    localStorage.removeItem('tileStrength');
  }
  selectedTile(position: string) {
  }
}
