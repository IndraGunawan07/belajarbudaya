import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { NavController } from "@ionic/angular";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class QuizappService {
  userList = [];
  category: string;
  idQuiz: string;
  userEmail: string;
  currentLevel: string;

  counterQuest: number;
  indexTrue: number;
  i: number = 0;
  live: number;

  adat: boolean;
  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private authSrv: AuthService
  ) {}

  getAllQuiz() {
    return this.firestore.collection(`SoalQuiz`).snapshotChanges();
  }
  setQuizExplain(id) {
    this.idQuiz = id;
    console.log(this.idQuiz);
  }
  getQuizExplain() {
    const data = this.firestore.doc<any>("SoalQuiz/" + this.idQuiz);
    return data.snapshotChanges();
  }
  setCounterQuest(counter: number) {
    this.counterQuest = counter;
  }
  getCounterQuest() {
    return this.counterQuest;
  }
  setLive(live: number) {
    this.live = live;
  }
  getLive() {
    return this.live;
  }
  getAllCategory() {
    return this.firestore.collection(`ListCategory`).snapshotChanges();
  }

  setCategorynLevel(clickedCategory, level) {
    this.category = clickedCategory;
    this.currentLevel = level;
    console.log("level sekarang", this.currentLevel);
    this.navCtrl.navigateForward("/level1");
  }

  getCategory() {
    return this.category;
  }
  updateCurrentLevel(id, currentLvl) {
    this.firestore.collection(`User`).doc(id).update({
      currentLevel: currentLvl,
      musik: false,
      tari: false,
      wisata: false,
      makanan: false,
      adat: false,
      rumah: false,
    });
  }

  getLevel() {
    return this.currentLevel;
  }
}
