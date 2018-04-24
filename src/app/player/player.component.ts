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
    return ['B22', 'C33', 'C9', 'C13'];
  }
  public setPosition(position: string) {
    this.position = position;
  }

}
