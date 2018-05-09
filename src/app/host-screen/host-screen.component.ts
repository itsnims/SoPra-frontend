import { Component, OnInit } from '@angular/core';
import {Room} from '../shared/models/room';
import {RoomService} from '../shared/services/room.service';
import {User} from '../shared/models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {DataService} from '../data.service';

@Component({
  selector: 'app-host-screen',
  templateUrl: './host-screen.component.html',
  styleUrls: ['./host-screen.component.css']
})

export class HostScreenComponent implements OnInit {
  room: Room;
  public room_name: string;
  current_host: string;
  placeholder: any;
  apiURL = 'https://sopra-fd2af.firebaseio.com/0.json';
  constructor(private _service: RoomService, private router: Router) {

  }

  paths = [
    {pathID: 'Standard Path', pathname: 'StandardPath'},
    {pathID: 'Hills of Gold', pathname: 'HillOfGold'},
    {pathID: 'Home Stretch', pathname: 'HomeStretchFields'},
    {pathID: 'Winding Paths', pathname: 'WindingPath'},
    {pathID: 'Serpentine', pathname: 'Serpentine'},
    {pathID: 'Swamplands', pathname: 'Swamplands'},
    {pathID: 'Witch\'s Cauldron', pathname: 'WitchsCauldron'}
  ];
  numbOfPlayers = [
    {numbValue: '4', numbSelect: '4'},
    {numbValue: '3', numbSelect: '3'},
    {numbValue: '2', numbSelect: '2'}
    ];

  public shown = false;

  public pwdInput() {
    if (this.shown === true) {
      this.room.pwdBool = true;
    } else {
      this.room.pwdBool = false;
    }
  }
  pathSelect() {
    this.room.pathname = (<HTMLInputElement>document.getElementById('path')).value;
  }

  playerNumSelect() {
    // this.room.path = (<HTMLInputElement>document.getElementById('selectPath')).value;
    this.room.maxPlayers = (<HTMLInputElement>document.getElementById('maxPlayer')).value;
    this.room.pathname = (<HTMLInputElement>document.getElementById('path')).value;
  }

  ngOnInit() {
    this.room = new Room();
    this.room.pathname = 'StandardPath';
    // this.current_host = JSON.parse(localStorage.getItem('currentUser')).name;
    // console.log('the current host is  : ' + this.current_host);
    // this.current_host = JSON.parse(localStorage.getItem('currentUser')).name;
  }

  createRoom() {
    localStorage.setItem('currentRoom', JSON.stringify(this.room.name));
    console.log('host_screen local storage: ' + localStorage);

    this._service.roomLogin(this.room)
      .subscribe(result => {
        if (result) {
          console.log('Result retrieved');
          this.router.navigate(['/waiting-screen']);
        }});
  }





}
