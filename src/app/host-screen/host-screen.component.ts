import { Component, OnInit } from '@angular/core';
import {Room} from "../shared/models/room";

@Component({
  selector: 'app-host-screen',
  templateUrl: './host-screen.component.html',
  styleUrls: ['./host-screen.component.css']
})

/* this part causes an error
export function pwdInput() {
  var checkbox = document.getElementById("myonoffswitch");
  var pwdSpace = document.getElementById("pwdSlot");

  if (checkbox == true){
    pwdSpace.style.display = "block";
  } else {
    pwdSpace.style.display = "none";
  }
}
*/

export class HostScreenComponent implements OnInit {
  room: Room;
  // used for drop down menu

  paths = [
    {pathID: "1", pathName: "Classic Path"},
    {pathID: "2", pathName: "Hills of Gold"},
    {pathID: "3", pathName: "Home Stretch"},
    {pathID: "4", pathName: "Winding Paths"},
    {pathID: "5", pathName: "Serpentine"},
    {pathID: "6", pathName: "Swamplands"},
    {pathID: "7", pathName: "Witch's Cauldron"}
  ];

  numbOfPlayers = [
    {numbValue: "2", numbSelect: "2"},
    {numbValue: "3", numbSelect: "3"},
    {numbValue: "4", numbSelect: "4"}
  ];

  constructor() {}


  ngOnInit() {
    this.room = new Room();
  }

}
