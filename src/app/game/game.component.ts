import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/services/user.service';
import {RoomService} from '../shared/services/room.service';
import {Room} from '../shared/models/room';
import {User} from '../shared/models/user';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent  implements OnInit {
  users: User[] = [];
  rooms: Room[] = [];

  constructor(private userService: UserService, private roomService: RoomService) { }

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
}
