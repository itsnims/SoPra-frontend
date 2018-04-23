import { Component, OnInit } from '@angular/core';
import {Room} from "../shared/models/room";
import {HttpClient} from "@angular/common/http";
import {User} from "../shared/models/user";
import {Observable} from "rxjs/Rx";
import {RoomService} from "../shared/services/room.service";
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-waiting-screen',
  templateUrl: './waiting-screen.component.html',
  styleUrls: ['./waiting-screen.component.css']
})
export class WaitingScreenComponent implements OnInit {
  current_player: string;
  current_room: string;
  users: User[] = [];
  private interval: number;
  private display: boolean;
  private alive: boolean;
  private playersArray: object;

  message: string;
  roomUrl = 'https://sopra-fs18-group13-server.herokuapp.com/Games/';

  constructor(private http: HttpClient, private getUsersFromRoomService: RoomService) {
  this.interval = 1000;
  this.display = false;
  this.alive = true;
  }

  ngOnInit() {
    this.current_player = JSON.parse(localStorage.getItem('currentUser')).name;
    this.current_room = JSON.parse(localStorage.getItem('currentRoom'));
    console.log('the current player is : ' + this.current_player);
    console.log('the current room is : ' + this.current_room);
    console.log(localStorage);
    this.http.get(this.roomUrl  + this.current_room).subscribe((data) => {
      console.log(Object.keys(data).map(key => ({type: key, value: data[key]})));
    });




  }
}
