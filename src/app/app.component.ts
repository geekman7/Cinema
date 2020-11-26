import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    // tslint:disable-next-line: prefer-const
    let firebaseConfig = {
      apiKey: 'AIzaSyDADt7BdJrRk8yHJRDku-7zIXmjPcUCOKQ',
      authDomain: 'cinema-e57c7.firebaseapp.com',
      databaseURL: 'https://cinema-e57c7.firebaseio.com',
      projectId: 'cinema-e57c7',
      storageBucket: 'cinema-e57c7.appspot.com',
      messagingSenderId: '301820719784',
      appId: '1:301820719784:web:19227453907d9ef2cfc89d',
      measurementId: 'G-RZ6D5JJSBF'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
