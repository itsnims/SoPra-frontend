import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Room} from '../models/room';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


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

    return this.http.post<User>(this.apiUrl, bodyString, httpOptions).map((fetchedUser: User) => {
      if (user) {
        // set token property
        // this.token = fetchedUser.token;
        console.log('fetchedUser : ' + fetchedUser);

        // store username and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('currentUser', JSON.stringify({username: fetchedUser.username, token: this.token}));
        localStorage.setItem('currentUser', JSON.stringify({name: user.username}));

        // return true to indicate successful login
        return user;
      } else {
        // return false to indicate failed login
        return null;
      }
    }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}















