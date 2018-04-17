import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {RoomService} from '../shared/services/room.service';
import {Room} from '../shared/models/room';
import {Router} from '@angular/router';
import {SuperUser, User} from '../shared/models/user';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent  implements OnInit {
  users: User[] = [];
  rooms: Room[] = [];
  joinable = true;
  playersInRoom = 4;


  constructor(private router: Router, private userService: UserService, private roomService: RoomService) { }

  ngOnInit() {

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

  addPlayerToRoom() {
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
