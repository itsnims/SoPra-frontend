import { Component, OnInit } from '@angular/core';
import {HexagonBoardComponent} from '../hexagon-board/hexagon-board.component';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.css']
})
export class StandardComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    document.getElementById ('B4').addEventListener ('click', b4, false);
    document.getElementById ('B3').addEventListener ('click', b3, false);



    function b4() {
      alert('Hello! I am an alert box!!');
    }
    function b3() {
      alert('Hello! alert box!!');
    }
  }

}
