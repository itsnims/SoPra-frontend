import { Component, OnInit } from '@angular/core';
import {Room} from "../shared/models/room";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../shared/models/user";
import {Observable} from "rxjs/Rx";
import {RoomService} from "../shared/services/room.service";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import 'rxjs/add/operator/takeWhile';
import {Router} from "@angular/router";

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
  public currentPlayers: number;
  public maxplayers: number;
  playerObject: object;
  playersInRoom: string[];
  pathName = '';

  message: string;
  roomUrl = 'https://sopra-fs18-group13-server.herokuapp.com/Games/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })};

  constructor(private http: HttpClient, private roomService: RoomService, private router: Router) {
    this.interval = 1000;
    this.display = false;
    this.alive = true;
    this.playersInRoom = new Array<string>();
  }

  ngOnInit() {
    // here we get all players of the current room from heroku

    this.current_player = JSON.parse(localStorage.getItem('currentUser')).name;
    this.current_room = JSON.parse(localStorage.getItem('currentRoom'));
    this.pathName = JSON.parse(localStorage.getItem('currentPath'));
    console.log('the current room is : ' + this.current_room);



    this.roomService.getRooms(this.current_room).subscribe(data => {
      console.log('we are calling getRooms');
      this.playerObject = data.players;
      for (const idx in this.playerObject) {
        this.playersInRoom.push((this.playerObject[idx]).name);
        // here we push the usernames of all opponents in the room into the list of opponents
      }
      console.log('these are the players: ' + this.playersInRoom);

      localStorage.setItem('playersInRoom', JSON.stringify(this.playersInRoom));
    });



    this.http.get(this.roomUrl  + this.current_room).subscribe((data) => {
      console.log('players in room :' +  data[0]);
      console.log('maxplayers : ' + data[1]);
      // console.log(Object.keys(data).map(key => ({type: key, value: data[key]})));

    });



    TimerObservable.create(0, this.interval)  // This executes the http request at the specified interval
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.roomService.getCurrentRoomInfo(this.roomUrl  + this.current_room + '/wait')
          .subscribe((data) => {
            this.currentPlayers = data[0];
            this.maxplayers = data[1];
            if (this.maxplayers === this.currentPlayers) {
              this.router.navigate(['/in-game-screen']);
            }
            if (!this.display) {
              this.display = true;
            }
          });
      });
  }

    quitRoom() {
        this.http.put(this.roomUrl + this.current_player + '/' + this.current_room + '/exit', this.httpOptions)
          .subscribe(result => console.log(result));
    }


}
