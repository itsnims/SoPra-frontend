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
  @Input() player: PlayerComponent = null;
  /*BACKEND current tiles*/
  clickables: string[];

  apiUrl = 'https://sopra-fs18-group13-server.herokuapp.com/Games/';
  currentRoom = JSON.parse(localStorage.getItem('currentRoom'));
  playerName = JSON.parse(localStorage.getItem('currentUser')).name;

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
    if (this.clickTile(this.hexId)) {
      console.log(this.hexId, 'was clicked');
      this.selectedTile(this.hexId);
      localStorage.setItem('selectedHex', JSON.stringify(this.hexId));
    }
  }
  public onhightlight() {
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

  addplayer(p: PlayerComponent) {
    console.log('i am here');
    this.player = p;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })};
    console.log('buggy ' + localStorage.getItem('currentTile') );
    return this.http.put(this.apiUrl + this.currentRoom + '/' + this.playerName + '/' + localStorage.getItem('currentTile'), httpOptions)
      .subscribe(result => console.log(result));
  }
  removePlayer() {
    this.player = null;
  }
  selectedTile(position: string) {
  }
}
