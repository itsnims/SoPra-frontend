import {HexagonBoardComponent} from '../hexagon-board/hexagon-board.component';
import {PlayerComponent} from '../player/player.component';
import {HexComponent} from '../hex/hex.component';
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

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.css']
})
export class StandardComponent implements OnInit, AfterViewInit {
/*classe für click events...
* */
  hex: HexComponent;
  players: PlayerComponent[] = [];
  hexMapById = new Map<string, HexComponent>();
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
  @ViewChildren(HexComponent) divs: QueryList<HexComponent>;
  ngOnInit() {
/*Adds players to Playercomponent list
* -> now players holds all current players*/
    const sample_players = ['player1', 'player2', 'player3', 'player4'];
    this.players.push(new PlayerComponent())
    this.players[0].playerId = sample_players[0];
    this.players[0].position = 'B1';
    this.players.push(new PlayerComponent())
    this.players[1].playerId = sample_players[1];
    this.players[1].position = 'B2';
    this.players.push(new PlayerComponent())
    this.players[2].playerId = sample_players[2];
    this.players[2].position = 'B3';
    this.players.push(new PlayerComponent())
    this.players[3].playerId = sample_players[3];
    this.players[3].position = 'B4';


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
    /*BACKEND need to make current player instead of dummy */
    /*highlights all potentialMoveIds*/
    console.log(this.hexMapById);
    this.setInitialPosition();
    this.players[0].getPotentialMoveIds()
      .forEach(moveId => {
      this.hexMapById.get(moveId).onhightlight();
      /*this.hex.selectedTile(this.players[0].getPotentialMoveIds());*/
    });
  }
  setInitialPosition() {
    this.hexMapById.get(this.players[0].position).addplayer(this.players[0]);
    this.hexMapById.get(this.players[1].position).addplayer(this.players[1]);
    this.hexMapById.get(this.players[2].position).addplayer(this.players[2]);
    this.hexMapById.get(this.players[3].position).addplayer(this.players[3]);
    console.log(this.players);
  }
  addPlayers() {
    temp = 0;
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].playerId === this.current_player) {
        this.temp = i;
      }
    }


    this.hexMapById.get(this.players[temp].position).removePlayer();
    this.players[0].position =  JSON.parse(localStorage.getItem('selectedHex'));
    this.hexMapById.get(JSON.parse(localStorage.getItem('selectedHex'))).addplayer(this.players[0]);
    console.log(this.players);
  }
  getPlayerPosition(playerId: string, position: string){

  }
  /*BACKEND Probabely need notion of current player*/
  updatePlayers(position: string) {

    this.hexMapById.get(position).addplayer(this.players[0])
  }


  mouseEnter(div: string) {
    console.log('mouse enter standard : ' + div);
  }

  mouseLeave(div: string) {
    console.log('mouse leave standard :' + div);
  }




}
