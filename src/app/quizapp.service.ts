import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
@Injectable({
  providedIn: "root",
})
export class QuizappService {
  category: string;
  idQuiz: string;
  time: number = 1;
  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController
  ) { }

  getAllQuiz() {
    return this.firestore.collection(`SoalQuiz`).snapshotChanges();
  }
  setQuizExplain(id) {
    this.idQuiz = id;
    console.log(this.idQuiz);
  }
  getQuizExplain() {
    const data = this.firestore.doc<any>('SoalQuiz/' + this.idQuiz);
    return data.snapshotChanges();
  }
  resetTime(time: number) {
    this.time = time;

  }
  getResetTime() {

    return this.time;
  }
  getAllCategory() {
    return this.firestore.collection(`ListCategory`).snapshotChanges();
  }

  setCategory(clickedCategory: string) {
    this.category = clickedCategory;
    this.navCtrl.navigateForward("/level1");
  }

  getCategory() {
    return this.category;
  }
}
