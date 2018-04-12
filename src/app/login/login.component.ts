import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Router} from '@angular/router';
import {User} from '../shared/models/user';
import {DataService} from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [DataService]
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  user: User;
  sample_users: User[] = [];

  constructor(private router: Router, private _service: AuthenticationService, private _router: Router, private dataservice: DataService) {

  }

  ngOnInit() {
    // reset login status
    this._service.logout();
    this.user = new User();
    this.dataservice.fetchData().subscribe(
      (data: User[]) => this.sample_users = data);

  }

  login() {
    this._service.login(this.user)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/game-lobby-screen']);
        } else {
          this.error = 'Username exists';
          this.loading = false;
        }
      });

    }




}
