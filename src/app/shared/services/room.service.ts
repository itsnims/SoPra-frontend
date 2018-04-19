import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Room} from '../models/room';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';

@Injectable()
export class RoomService {
  private apiUrl: string;
  public token: string; // we probably need the actual token of a certain player
  public roomUrl: string;
  public playersUrl: string;
  public testUrl: string;
  public users: User[] = [];
  User = new User();



  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {

    /*TODO fill in your heroku-backend URL*/
    this.apiUrl = 'https://sopra-fd2af.firebaseio.com/1/rooms.json';
    this.playersUrl = 'https://sopra-fd2af.firebaseio.com/1/rooms/0/PlayersInRoom.json';
    this.testUrl = 'https://sopra-fd2af.firebaseio.com/1/rooms';
    this.roomUrl = 'https://sopra-fs18-group13-server.herokuapp.com/Games';
  }

  getRooms(): Observable<Room[]> {
    /*const httpOptions = {
      headers: new HttpHeaders({'Authorization': 'Bearer ' + this.authenticationService.token})
    }; */
    // get users from api
    return this.http.get<Room[]>(this.roomUrl);
  }


  joinRoomLogin(user: User): Observable<User> {
    // this.testID += 1;
    const bodyString = JSON.stringify({username: user.username}); // this has to be changed to the actual user's username
    // const userID = JSON.stringify({id: user.id})

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put<User>('https://sopra-fs18-group13-server.herokuapp.com/Games/Nimra/test_room/secret_password/join', null, httpOptions);
  }


  showCurrentHost(): string {
    return JSON.parse(localStorage.getItem('currentUser')).name;
  }

  roomLogin(room: Room): Observable<Room> {

    this.User.token = '';
    this.User.username = '';   // here we hardcode a user, so that we can display the room in an appropriate JSON format
    this.User.id = 1;

    const bodyString = JSON.stringify({name: room.name, owner: this.showCurrentHost(), maxplayer : room.maxPlayers, password : room.pwd}); // TODO add path ID
    // const userID = JSON.stringify({id: user.id})

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<Room>(this.roomUrl, bodyString, httpOptions).map((fetchedUser: Room) => {
      if (room) {
        // set token property

        // return true to indicate successful login
        return room;
      } else {
        // return false to indicate failed login
        return null;
      }
    }) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}

