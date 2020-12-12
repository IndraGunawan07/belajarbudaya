import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { QuizappService } from 'src/app/quizapp.service';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.page.html',
  styleUrls: ['./explanation.page.scss'],
})
export class ExplanationPage implements OnInit {

  @ViewChild('slides') slides: any;
  slideOptions: any;
  quizExplain = [];
  quizData: SoalQuiz;
  title: string;
  desc: string;
  imgUrl: string;
  counter: number;
  live: number;


  constructor(private quizService: QuizappService, private alertController: AlertController, private router: Router, private navigate: NavController) {
    this.quizData = {} as SoalQuiz;
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    console.log(this.quizService.getQuizExplain());
    this.quizService.getQuizExplain().subscribe(data => {

      this.title = data.payload.data()['title'];
      this.desc = data.payload.data()['description'];
    });

  }
  nextSlide() {
    this.counter = this.quizService.getCounterQuest();
    this.live = this.quizService.getLive();

    if (this.live >= 0 && this.counter === 10) {
      this.router.navigateByUrl('/level-clear');
    }
    else if (this.live === 0) {
      console.log('false');
      this.router.navigateByUrl('/levellose');
    }
    else {

      this.navigate.back();
    }

  }

}
