import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {RoomService} from '../shared/services/room.service';
import {Room} from '../shared/models/room';
import {Router} from '@angular/router';
import { HttpClient} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";
import {SuperUser, User} from '../shared/models/user';
import {LoginComponent} from "../login/login.component";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent  implements OnInit {
  users: User[] = [];
  rooms: Room[] = [];
  joinable = true;
  current_player: string;
  playersInRoom = 4;
  sample_user: User;
  private apiUrl: string;


  constructor(private router: Router, private userService: UserService, private roomService: RoomService, private http: HttpClient, private loginComponent: LoginComponent) { }

  ngOnInit() {

    this.current_player = JSON.parse(localStorage.getItem('currentUser')).name;
    console.log('the current player is : ' + this.current_player);


    // get users from secure api end point
    /* this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      }); */
    this.roomService.getRooms()
      .subscribe(rooms => {
        this.rooms = rooms;
      });
  }

  joinRoom() {
    if (this.joinable === true) {
      this.joinable = true;
    }
  }




  addPlayerToRoom(room_name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.apiUrl = 'https://sopra-fs18-group13-server.herokuapp.com/Games/';
    this.apiUrl +=  this.sample_user.username + '/' + room_name + 'null/join' ; // TODO change this to the actual player, make sure the actual password is implemented
    console.log(this.apiUrl);
    this.http.put(this.apiUrl, null, httpOptions);

    /*this.roomService.joinRoomLogin(this.users)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/waiting-game']);
        } else {
          this.router.navigate(['/game']);
        }
      }); */
  }
}
