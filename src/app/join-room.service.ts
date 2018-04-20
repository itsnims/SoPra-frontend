import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './shared/models/user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class JoinRoomService {


  constructor(private http: HttpClient) { }

  letPlayerJoinRoom(apiUrl: string): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8'
      })
    };
    return this.http.put(apiUrl, httpOptions).map((fetchedUser: User) => {
      if (apiUrl) {
        console.log('letPlayerJoinRoom worked' );
        return apiUrl;
      } else {
        // return false to indicate failed login
        return null;
      }
    }); // ...and calling .json() on the response to return data
  }
}





