import { Component, OnInit, ViewChild } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Navigation, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { QuizappService } from 'src/app/quizapp.service';
import { ModalAlertComponent } from '../components/modal-alert/modal-alert.component';


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
  timer: any = 15;
  live: any = 3;
  clickAnswer: any = 0;
  interval: any;
  category: string;
  openModal: string;
  index: number;


  constructor(private quizService: QuizappService, private firestore: AngularFirestore, private alertController: AlertController, private router: Router, private modalController: ModalController, private navigate: NavController) {
    this.quizData = {} as SoalQuiz;

  }

  ngOnInit() {


  }
  ionViewWillEnter() {
    this.slides.lockSwipes(true);
    if (this.index > 0) {
      console.log('true');
    }
    this.quizService.getAllQuiz().subscribe(data => {

      this.quizList = data.map(e => {

        return {
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
      this.startTimer();
      this.quizList = this.quizList.filter(currentData => {
        console.log(currentData.level);
        this.category = this.quizService.getCategory();
        console.log(this.category);
        if (currentData.level == 1 && currentData.category == this.category) {

          return true;
        }
        return false;
      });


    });

    // this.startTimer();
  }
  startTimer() {
    var stop = 0;

    this.interval = setInterval(function () {

      this.timer--;

      if (this.timer == 0) {
        stop = 1;
      }
      if (stop == 1) {

        clearInterval(this.interval);
        this.live -= 1;
        this.presentTimeout();
      }

    }.bind(this), 1000)

  }
  selectAnswer(answer, question) {
    console.log('jawaban' + answer);
    console.log('coba' + question.trueAnswer);
    if (answer === question.trueAnswer) {
      clearInterval(this.interval);
      this.presentTrue(question.id);
    }
    else {
      this.live -= 1;
      clearInterval(this.interval);
      this.presentFalse(question.id, question.trueAnswer);
    }
  }
  goToPenjelasan(id) {

    // clearInterval(this.interval);
    // const penjelasan = this.quizService.setQuizExplain(id);
    // this.openModal = '1';
    // this.nextSlide();
    // const modal = await this.modalController.create({
    //   component: ModalAlertComponent,
    //   cssClass: 'modal-class',
    //   backdropDismiss: false
    // });

    // return await modal.present();
    clearInterval(this.interval);
    const penjelasan = this.quizService.setQuizExplain(id);
    this.navigate.navigateForward('/explanation');
    this.index = this.quizService.getResetTime();
    console.log(this.index);
    this.nextSlide2(this.index);
  }
  nextSlide2(index) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(index, 2000);
    this.timer = 30;
    this.startTimer();
    this.slides.lockSwipes(true);
  }
  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.timer = 15;
    this.startTimer();
    this.slides.lockSwipes(true);
  }
  async presentTrue(id) {


    const alert = await this.alertController.create({
      header: 'Jawaban Anda Benar',
      cssClass: 'alert-true',
      buttons: [
        {
          text: 'Penjelasan',

          cssClass: 'buttonColor',
          handler: () => this.goToPenjelasan(id)
        },
        {
          text: 'Selanjutnya',
          cssClass: 'primary',
          handler: () => this.nextSlide()
        }
      ],
      backdropDismiss: false
    });
    await alert.present();




  }
  async presentFalse(id, answer) {
    const alert = await this.alertController.create({
      header: 'Jawaban Anda Salah',
      cssClass: 'alert-false',
      message: 'Jawaban yang Benar :' + answer,
      buttons: [
        {
          text: 'Penjelasan',

          cssClass: 'buttonColor',
          handler: () => this.goToPenjelasan(id)
        },
        {
          text: 'Selanjutnya',
          cssClass: 'primary',
          handler: () => this.nextSlide()
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }
  async presentTimeout(id) {
    const alert = await this.alertController.create({
      header: 'Waktu Anda Habis',
      cssClass: 'alert-false',
      buttons: [
        {
          text: 'Penjelasan',
          cssClass: 'buttonColor',
          handler: () => this.goToPenjelasan(id)
        },
        {
          text: 'Selanjutnya',
          cssClass: 'primary',
          handler: () => this.nextSlide()
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }



}
