import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Room} from '../models/room';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthenticationService {
  public token: string;
  private apiUrl: string;
  private roomUrl: string;
  // public ID = 0;
  public var = 0;


  constructor(private http: HttpClient) {
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

    // TODO fill in your heroku-backend URL
    // this.apiUrl = 'https://git.heroku.com/sopra-fs18-group13-server.git';
    this.apiUrl = 'https://sopra-fs18-group13-server.herokuapp.com/User';
    this.roomUrl = 'https://sopra-fd2af.firebaseio.com/0/rooms.json';

  }

  assignUniqueID() {
    this.var++;
    return this.var;
  }

  login(user: User): Observable<User> {
    // this.testID += 1;
    const bodyString = JSON.stringify({name: user.username});
    // const userID = JSON.stringify({id: user.id})

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<User>(this.apiUrl, bodyString, httpOptions);
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}















