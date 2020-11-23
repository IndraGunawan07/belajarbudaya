import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { QuizappService } from 'src/app/quizapp.service';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.page.html',
  styleUrls: ['./explanation.page.scss'],
})
export class ExplanationPage implements OnInit {

  quizExplain = [];
  quizData: SoalQuiz;
  title: string;
  desc: string;
  imgUrl: string;



  constructor(private quizService: QuizappService, private alertController: AlertController, private router: Router) {
    this.quizData = {} as SoalQuiz;
  }

  ngOnInit() {
    console.log(this.quizService.getQuizExplain());
    this.quizService.getQuizExplain().subscribe(data => {

      this.title = data.payload.data()['title'];
      this.desc = data.payload.data()['description'];
      this.imgUrl = data.payload.data()['imgUrl'];







    });
  }

}
