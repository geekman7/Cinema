import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpform: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  // tslint:disable-next-line: typedef
  initForm() {
    this.signUpform = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // tslint:disable-next-line: typedef
  onSubmit(){
    const email = this.signUpform.get('email').value;
    const password = this.signUpform.get('password').value;
    this.authService.createNewUser(email, password)
                    .then(
                      () => {
                        this.router.navigate(['/films']);
                      },
                      (error) => {
                        this.errorMessage = 'identifiant ou mot de passe incorrect';
                      }
                    );

  }

}
