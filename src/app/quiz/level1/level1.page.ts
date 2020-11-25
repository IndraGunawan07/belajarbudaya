import { Component, OnInit, ViewChild } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { Navigation, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
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
  questionId: string;

  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  timer: number;
  interval;
  startDuration = 1;

  live: any = 3;
  clickAnswer: any = 0;

  category: string;
  openModal: string;
  index: number = 0;


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

      this.quizList = this.quizList.filter(currentData => {
        console.log(currentData.level);
        this.category = this.quizService.getCategory();
        console.log(this.category);
        if (currentData.level == 1 && currentData.category == this.category) {
          console.log('data');
          return true;
        }
        return false;
      });
      this.questionId = this.quizList[this.index].id;

    });
    this.startTimer(this.startDuration);


  }
  startTimer(duration) {
    // let stop = 0;
    clearInterval(this.interval);
    this.timer = duration * 15;
    this.updateTimeValue();
    this.interval = setInterval(() => {
      this.updateTimeValue();
    }, 1000);

  }
  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);

    const text = minutes + ':' + seconds;
    this.time.next(text);

    --this.timer;

    if (this.timer <= -1) {

      // this.startTimer(this.startDuration);
      clearInterval(this.interval);
      this.live -= 1;
      this.presentTimeout(this.questionId);
    }

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
    if (index != 0) {

      this.startTimer(this.startDuration);
    }
    this.slides.lockSwipes(true);
  }
  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.startTimer(this.startDuration);
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