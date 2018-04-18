import { Component, OnInit } from '@angular/core';
import {HexagonBoardComponent} from '../hexagon-board/hexagon-board.component';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.css'],
})
export class StandardComponent implements OnInit {
  constructor() { }
/*classe für click events...
* */
  ngOnInit() {
/*Selectiert nur die felder der liste und macht für jedes ein click event mit funktion call pos
* */
    const positions = ['B4', 'B9', 'B11'];
    for (const position of positions){
      document.getElementById (position).addEventListener ('click', pos, false);}




    /*this.positionService.fetchPosition().subscribe((data) => this.positions = data);*/


/*Has to be remodeled to just return the field to the backend.*/
    function pos() {
      alert('Hello! I am an alert box!!');
    }


  }

}
