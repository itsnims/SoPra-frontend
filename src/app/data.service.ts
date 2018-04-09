import {Injectable, OnInit} from '@angular/core';
import {Http} from '@angular/http';
declare var firebase: any;

@Injectable()
export class DataService {


  /*fbGetData()
  {
    .database connects to database
    * .ref tells us at which level we want to access our database (e.g. /users) here root
    * .on("child added") listens to whenever we add a ne child e.g. user or room*
    firebase.database().ref('/').on('child_added', (snapshot) => {console.log(snapshot.val());
    });
  }
}*/
}
