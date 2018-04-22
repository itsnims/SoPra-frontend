import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {RoomService} from '../shared/services/room.service';
import {Room} from '../shared/models/room';
import {Router} from '@angular/router';
import { HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {SuperUser, User} from '../shared/models/user';
import {JoinRoomService} from "../join-room.service";
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/takeWhile';
import {TimerObservable} from "rxjs/observable/TimerObservable";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent  implements OnInit, OnDestroy {
  users: User[] = [];
  rooms: Room[] = [];
  joinable = true;
  current_player: string;
  playersInRoom = 4;
  sample_user: User;
  private apiUrl: string;

  private display: boolean; // whether to display info in the component
                            // use *ngIf="display" in your html to take
                            // advantage of this

  private alive: boolean; // used to unsubscribe from the TimerObservable
                          // when OnDestroy is called.
  private interval: number;

  constructor(private router: Router, private userService: UserService, private roomService: RoomService, private http: HttpClient, private joinRoomService: JoinRoomService) {
    this.display = false;
    this.alive = true;
    this.interval = 1000;
  }

  ngOnInit() {

    this.current_player = JSON.parse(localStorage.getItem('currentUser')).name;
    console.log('the current player is : ' + this.current_player);


    // get users from secure api end point
    /* this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      }); */


    TimerObservable.create(0, this.interval)  // This executes the http request at the specified interval
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.roomService.getRooms()
          .subscribe((rooms) => {
            this.rooms = rooms;
            if (!this.display) {
              this.display = true;
            }
          });
      });

   /* this.roomService.getRooms()
      .subscribe(rooms => {
        this.rooms = rooms;
      }); */
  }

  joinRoom() {
    if (this.joinable === true) {
      this.joinable = true;
    }
  }


  addPlayerToRoom(room_name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Origin' : '*'
      })};
    this.apiUrl = 'https://sopra-fs18-group13-server.herokuapp.com/Games/';
    this.apiUrl +=  this.current_player + '/' + room_name + '/null/join' ; // TODO make sure the actual password is implemented
    console.log(this.http.put(this.apiUrl, httpOptions));
    localStorage.setItem('currentRoom', JSON.stringify(room_name));
    this.router.navigate(['/waiting-screen']);

    this.http.put(this.apiUrl, null, httpOptions).subscribe(result => console.log(result));
    }



    /*this.roomService.joinRoomLogin(this.users)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/waiting-game']);
        } else {
          this.router.navigate(['/game']);
        }
      }); */

  ngOnDestroy() {
    this.alive = false; // switches your TimerObservable off
  }
}

