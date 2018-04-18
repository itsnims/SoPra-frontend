import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';
import {DataService} from '../data.service';
declare var firebase: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [DataService]
})
export class LoginComponent implements OnInit {
  public current_user;
  model: any = {};
  loading = false;
  error = '';
  user: User;
  sample_users: User[] = [];

  constructor(private router: Router, private _service: AuthenticationService, private _router: Router, private dataService: DataService) {

  }

  ngOnInit() {
    // reset login status
    this._service.logout();
    this.user = new User();
    /*this.dataService.fetchData().subscribe(
      (data: User[]) => this.sample_users = data);*/
    this.fbGetData();

  }

  login() {
    this._service.login(this.user)
      .subscribe(result => {
        if (result) {
          console.log(this.user.username);
          this.router.navigate(['/game']);
        } else {
          this.error = 'Username exists';
          this.loading = false;
        }
      });
    }


  fbGetData() {
    /*firebase.database database connects to database*/
    /*.ref tells us at which level we want to access our database (e.g. /users) here root*/
    /*.on('child added') listens to whenever we add a ne child e.g. user or room*/
    firebase.database().ref('/').on('child_added', (snapshot) => {this.sample_users.push(snapshot.val());
    });
  }



}
