import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { NavController } from "@ionic/angular";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root",
})
export class QuizappService {
  category: string;
  idQuiz: string;
  time: number = 1;
  indexTrue: number;
  userList = [];
  i: number = 0;
  userEmail: string;
  currentLevel: string;
  adat: boolean;
  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private authSrv: AuthService
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
