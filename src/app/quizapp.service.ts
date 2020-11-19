import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class QuizappService {
  collectionName = "SoalQuiz"

  constructor(private firestore: AngularFirestore) { }

  getAllQuiz() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
}
