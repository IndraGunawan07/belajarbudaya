import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  coba = false;
  user: any;
  email: any;
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => resolve(res),
          (err) => reject(err)
        );
    });
  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth
        .signInWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => {
            this.user = res.user;
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.fireAuth.currentUser) {
        this.fireAuth
          .signOut()
          .then(() => {
            console.log("Log Out");
            resolve();
          })
          .catch((error) => {
            reject();
          });
      }
    });
  }

  getCurrentUser() {
    return this.fireAuth.user;
  }

  test() {
    console.log("masuk");
  }

  getUser(){
    this.fireAuth.user.subscribe((res) => {
      if (res.email !== null){
        this.coba = true;
      }
    });
  }

  getTest(){
    return this.coba;
  }
}
