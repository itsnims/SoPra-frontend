import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable()
export class DataService {

  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get('https://sopra-fd2af.firebaseio.com/.json');
  }}




