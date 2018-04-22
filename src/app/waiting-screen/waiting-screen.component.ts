import { Component, OnInit } from '@angular/core';
import {Room} from "../shared/models/room";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-waiting-screen',
  templateUrl: './waiting-screen.component.html',
  styleUrls: ['./waiting-screen.component.css']
})
export class WaitingScreenComponent implements OnInit {
  current_player: string;
  current_room: string;
  message: string;
  roomUrl = 'https://sopra-fs18-group13-server.herokuapp.com/Games/';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.current_player = JSON.parse(localStorage.getItem('currentUser')).name;
    this.current_room = JSON.parse(localStorage.getItem('currentRoom')).room_name;
    console.log('the current player is : ' + this.current_player);
    console.log('the current room is : ' + this.current_room);

   /* this.http.get('https://sopra-fs18-group13-server.herokuapp.com/Games/').map(
      (res) => JSON.stringify(res)
    ).subscribe((data) => console.log(data)); */ // This returns a string with info about all games

  }

}
