import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() playerId: string;
  @Input() position: string;
  twoplayer: string;


  ngOnInit(
  ) { }

  clickedP() {
   // TO DO have to see what IDs i need to have.
    this.twoplayer = localStorage.getItem('mode')
    if (this.twoplayer === '"true"') {
      localStorage.removeItem('currentTwoPlayer');
      localStorage.setItem('currentTwoPlayer', JSON.stringify(this.playerId));
    }
  }
  constructor() {}
  /*BACKEND needs all potential moves for player!!*/
  getPotentialMoveIds() {
    return JSON.parse(localStorage.getItem('possibleTiles'));
  }
  public setPosition(position: string, playerId: string) {
    this.position = position;
    this.playerId = playerId;
  }


  // public getPosition()

}
