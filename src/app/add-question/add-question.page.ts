import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.page.html',
  styleUrls: ['./add-question.page.scss'],
})
export class AddQuestionPage implements OnInit {
  userDoc: any;
  constructor(private fireStore: AngularFirestore) {



  }

  ngOnInit() {
    this.fireStore.collection('SoalQuiz').add({
      answer1: 'Bosku',
      question: 'Apa itu Bosku?',
      // Other info you want to add here
    });
  }

}
