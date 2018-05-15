import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {
  showTutorial = true;

  showTutorialFunc() {
    if (this.showTutorial === true)
      this.showTutorial = false;
    else
      this.showTutorial = true;
  }
  constructor() { }

  ngOnInit() {
  }

}
