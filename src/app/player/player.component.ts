import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() playerId: string;
  @Input() position: string;


  ngOnInit() { }

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
