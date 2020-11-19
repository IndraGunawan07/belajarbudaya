import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { QuizappService } from 'src/app/quizapp.service';

interface Quiz {
  id: string;
  quizName: string;
  quizDesc: string;
}
@Component({
  selector: 'app-level1',
  templateUrl: './level1.page.html',
  styleUrls: ['./level1.page.scss'],
})
export class Level1Page implements OnInit {

  quizList = [];
  quizData: Quiz;
  constructor(private quizService: QuizappService,) {
    this.quizData = {} as Quiz;
  }

  ngOnInit() {

    this.quizService.getAllQuiz().subscribe(data => {

      this.quizList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          quizName: e.payload.doc.data()['quizName'],
          quizDesc: e.payload.doc.data()['quizDesc'],

        };
      })
      console.log(this.quizList);

    });
  }


}
