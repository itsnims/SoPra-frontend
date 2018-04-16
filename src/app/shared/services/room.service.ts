import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Room} from '../models/room';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class RoomService {
  private apiUrl: string;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {

    /*TODO fill in your heroku-backend URL*/
    this.apiUrl = 'https://sopra-fd2af.firebaseio.com/1/rooms.json';
  }

  getRooms(): Observable<Room[]> {
    /*const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authenticationService.token})
    }; */
    // get users from api
    return this.http.get<Room[]>(this.apiUrl);
  }
}

