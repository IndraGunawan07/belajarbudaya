import { Component, OnInit, ViewChild } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { QuizappService } from 'src/app/quizapp.service';


@Component({
  selector: 'app-level1',
  templateUrl: './level1.page.html',
  styleUrls: ['./level1.page.scss'],
})
export class Level1Page implements OnInit {

  @ViewChild('slides') slides: any;
  slideOptions: any;
  quizList = [];
  quizData: SoalQuiz;
  category: string;


  constructor(private quizService: QuizappService, private firestore: AngularFirestore, private alertController: AlertController, private router: Router) {
    this.quizData = {} as SoalQuiz;

  }

  ngOnInit() {


  }
  ionViewWillEnter() {
    this.slides.lockSwipes(true);
    var i = 0;
    this.quizService.getAllQuiz().subscribe(data => {

      this.quizList = data.map(e => {
        return {
          index: i,
          id: e.payload.doc.id,
          isEdit: false,
          question: e.payload.doc.data()['question'],
          answer1: e.payload.doc.data()['answer1'],
          answer2: e.payload.doc.data()['answer2'],
          answer3: e.payload.doc.data()['answer3'],
          answer4: e.payload.doc.data()['answer4'],
          imgUrl: e.payload.doc.data()['imgUrl'],
          trueAnswer: e.payload.doc.data()['trueAnswer'],
          level: e.payload.doc.data()['level'],
          region: e.payload.doc.data()['region'],
          category: e.payload.doc.data()['category'],

        };

      });
      this.quizList = this.quizList.filter(currentData => {
        console.log(currentData.level);
        this.category = this.quizService.getCategory();
        console.log(this.category);
        if (currentData.level === 1 && currentData.category === this.category) {
          return true;
        }
        return false;
      });

    });
  }

  selectAnswer(answer, question) {
    console.log('jawaban' + answer);
    console.log('coba' + question.trueAnswer);
    if (answer === question.trueAnswer) {
      this.presentTrue();
    }
    else {
      this.presentFalse();
    }
  }
  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
  async presentTrue() {
    const alert = await this.alertController.create({
      header: 'Jawaban Anda Benar',
      cssClass: 'alert-true',
      buttons: [
        {
          text: 'Penjelasan',

          cssClass: 'buttonColor',
        },
        {
          text: 'Selanjutnya',
          cssClass: 'primary',
          handler: () => this.nextSlide()
        }
      ]
    });

    await alert.present();
  }
  async presentFalse() {
    const alert = await this.alertController.create({
      header: 'Jawaban Anda Salah',
      cssClass: 'alert-false',
      buttons: [
        {
          text: 'Penjelasan',

          cssClass: 'buttonColor',
        },
        {
          text: 'Selanjutnya',
          cssClass: 'primary',
          handler: () => this.nextSlide()
        }
      ]
    });

    await alert.present();
  }



}
