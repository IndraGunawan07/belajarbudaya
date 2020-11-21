import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationsForm: FormGroup;
  errorMessage: string = '';

  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required,'},
      { type: 'pattern', message: 'Enter a valid email.'}
    ],
    password: [
      { type: 'reqired', message: 'Password is required.'},
      { type: 'minLength', message: 'Password must be at least 6 characters long,'}
    ]
  };

  constructor(
    private authSrv: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  loginUser(value){
    this.authSrv.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = '';
      this.router.navigateByUrl('/home');
    }, err => {
      this.errorMessage = err.message;
    });
  }

  goToRegisterPage(){
    this.router.navigateByUrl('/register');
  }

}
