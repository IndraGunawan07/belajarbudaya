import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { QuizappService } from 'src/app/quizapp.service';


@Component({
  selector: 'app-level1',
  templateUrl: './level1.page.html',
  styleUrls: ['./level1.page.scss'],
})
export class Level1Page implements OnInit {

  quizList = [];
  quizData: SoalQuiz;

  constructor(private quizService: QuizappService, private firestore: AngularFirestore) {
    this.quizData = {} as SoalQuiz;
  }

  ngOnInit() {

    this
    this.quizService.getAllQuiz().subscribe(data => {

      this.quizList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          question: e.payload.doc.data()['question'],
          answer1: e.payload.doc.data()['answer1'],

        };
      })
      console.log(this.quizList);

    });
  }


}
