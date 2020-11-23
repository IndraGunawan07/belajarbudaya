import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { QuizappService } from 'src/app/quizapp.service';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
export class ModalAlertComponent implements OnInit {

  quizExplain = [];
  quizData: SoalQuiz;
  title: string;
  desc: string;
  imgUrl: string;



  constructor(private modalCtrl: ModalController, private quizService: QuizappService, private router: Router) {
    this.quizData = {} as SoalQuiz;
  }


  ngOnInit() {
    this.quizService.getQuizExplain().subscribe(data => {

      this.title = data.payload.data()['title'];
      this.desc = data.payload.data()['description'];
      this.imgUrl = data.payload.data()['imgUrl'];
      console.log(this.title);
    });
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.quizService.resetTime(1);
    this.modalCtrl.dismiss();
  }


}
