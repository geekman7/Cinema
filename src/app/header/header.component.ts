import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  current: any;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
      firebase.auth().onAuthStateChanged(
          (user) => {
            if (user){
              this.isAuth = true;
              this.current = user.email;
            }else{
              this.isAuth = false;
            }
          }
      );
  }

  // tslint:disable-next-line: typedef
  onSignOut() {
      this.authService.signOutUser();
  }

}
