import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PlayerComponent} from '../player/player.component';
import {StandardComponent} from '../standard/standard.component';

@Component({
  selector: 'app-hex',
  templateUrl: './hex.component.html',
  styleUrls: ['./hex.component.css']
})
export class HexComponent implements OnInit {
  @Input() hexId: string;
  @Input() colourclass: string;
  @Input() strengthId: string;
  opacity  = 1;
  value = false;
  @Input() player: PlayerComponent = null;
  /*BACKEND current tiles*/
  clickables = ['B9', 'B7', 'B23']

  constructor() {}

  ngOnInit() {
  }
  /*Sets truth false value according to what u click*/
  public clickTile(id){
    String(id)
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
    this.player = p;
  }
  selectedTile(position: string) {

  }
}
