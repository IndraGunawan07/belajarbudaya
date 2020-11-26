import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  email: any;
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router
  ) { }

  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  loginUser(value){
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.signInWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  logoutUser(){
    return new Promise((resolve, reject) => {
      if (this.fireAuth.currentUser){
        this.fireAuth.signOut()
        .then(() => {
          console.log('Log Out');
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    });
  }

  getCurrentUser(){
    // this.fireAuth.authState.subscribe(user => {
    //   this.email = user.email;
    //   // return this.email;
    // });
    // return await this.email;
    // await this.fireAuth.user.subscribe(res => {
    //   this.email = res;
    // });
    // return await this.email;
    return this.fireAuth.user;
  }

  test(){
    console.log('masuk');
  }

}
