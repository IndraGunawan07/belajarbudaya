import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class QuizappService {
  category: string;

  constructor(
    private firestore: AngularFirestore,
    private navCtrl: NavController
    ) { }

  getAllQuiz() {
    return this.firestore.collection(`SoalQuiz`).snapshotChanges();
  }

  getAllCategory(){
    return this.firestore.collection(`ListCategory`).snapshotChanges();
  }

  setCategory(clickedCategory: string){
    this.category = clickedCategory;
    this.navCtrl.navigateForward('/level1');
  }

  getCategory() {
    return this.category;
  }
}
