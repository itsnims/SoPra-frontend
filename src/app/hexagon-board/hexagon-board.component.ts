import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hexagon-board',
  templateUrl: './hexagon-board.component.html',
  styleUrls: ['./hexagon-board.component.css']

})
export class HexagonBoardComponent implements OnInit {

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
