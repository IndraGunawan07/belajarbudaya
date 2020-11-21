import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class QuizappService {

  constructor(private firestore: AngularFirestore) { }

  getAllQuiz() {
    return this.firestore.collection(`SoalQuiz`).snapshotChanges();
  }
  getCategory() {
    var data = "Makanan";
    return data;
  }
}
