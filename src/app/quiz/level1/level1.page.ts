import { Component, OnInit, ViewChild } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { Navigation, Router } from "@angular/router";
import {
  AlertController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { QuizappService } from "src/app/quizapp.service";
import { UtilsService } from "src/app/utils.service";
import { ModalAlertComponent } from "../components/modal-alert/modal-alert.component";

@Component({
  selector: "app-level1",
  templateUrl: "./level1.page.html",
  styleUrls: ["./level1.page.scss"],
})
export class Level1Page implements OnInit {
  @ViewChild("slides") slides: any;
  slideOptions: any;
  quizList = [];
  quizData: SoalQuiz;
  questionId: string;

  time: BehaviorSubject<string> = new BehaviorSubject("00:00");
  timer: number;
  interval;
  startDuration = 1;

  live: number = 3;
  clickAnswer: any = 0;
  region: any;

  category: string;
  currentLevel: string;
  openModal: string;
  index: number = 0;
  numberQuestion: number = 0;

  constructor(
    private quizService: QuizappService,
    private utilService: UtilsService,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController,
    private navigate: NavController
  ) {
    this.quizData = {} as SoalQuiz;
  }

  ngOnInit() {}
  ionViewDidEnter() {
    this.slides.lockSwipes(true);
    this.utilService.setProvince();
    this.quizService.getAllQuiz().subscribe((data) => {
      this.quizList = data.map((e) => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          question: e.payload.doc.data()["question"],
          answer1: e.payload.doc.data()["answer1"],
          answer2: e.payload.doc.data()["answer2"],
          answer3: e.payload.doc.data()["answer3"],
          answer4: e.payload.doc.data()["answer4"],
          imgUrl: e.payload.doc.data()["imgUrl"],
          trueAnswer: e.payload.doc.data()["trueAnswer"],
          level: e.payload.doc.data()["level"],
          region: e.payload.doc.data()["region"],
          category: e.payload.doc.data()["category"],
        };
      });

      this.quizList = this.quizList.filter((currentData) => {
        this.category = this.quizService.getCategory();
        this.currentLevel = this.quizService.getLevel();
        this.region = this.utilService.getProvince();
        console.log(this.region);

        if (
          currentData.level == this.currentLevel &&
          currentData.category == this.category &&
          currentData.region != this.region
        ) {
          return true;
        }
        return false;
      });

      this.questionId = this.quizList[this.index].id;
    });

    this.startTimer(this.startDuration);
  }
  ionViewWillLeave() {
    clearInterval(this.interval);
  }

  startTimer(duration) {
    // let stop = 0;
    clearInterval(this.interval);
    this.timer = duration * 20;
    this.updateTimeValue();
    this.interval = setInterval(() => {
      this.updateTimeValue();
    }, 1000);
  }

  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;

    minutes = String("0" + Math.floor(minutes)).slice(-2);
    seconds = String("0" + Math.floor(seconds)).slice(-2);

    const text = minutes + ":" + seconds;
    this.time.next(text);

    --this.timer;

    if (this.timer <= -1) {
      clearInterval(this.interval);
      this.live -= 1;
      this.presentTimeout(this.questionId);
    }
  }

  selectAnswer(answer, question) {
    this.quizService.setLive(this.live);
    this.numberQuestion = this.numberQuestion + 1;
    if (answer === question.trueAnswer) {
      clearInterval(this.interval);
      this.presentTrue(question.id);
    } else {
      this.live -= 1;
      clearInterval(this.interval);
      this.quizService.setLive(this.live);
      console.log("getLivefalce: ", this.quizService.getLive());
      this.presentFalse(question.id, question.trueAnswer);
    }
  }

  goToExplanation(id) {
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

    this.quizService.setQuizExplain(id);

    this.navigate.navigateForward("/explanation");
    this.quizService.setCounterQuest(this.numberQuestion);

    this.nextSlide2();
  }
  nextSlide2() {
    console.log("life ", this.live);
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.startTimer(this.startDuration);
    this.slides.lockSwipes(true);
  }
  nextSlide() {
    if (this.live >= 0 && this.numberQuestion === 10) {
      this.router.navigateByUrl("/level-clear");
    } else if (this.live === 0) {
      this.router.navigateByUrl("/levellose");
    } else {
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.startTimer(this.startDuration);
      this.slides.lockSwipes(true);
    }
  }
  async presentTrue(id) {
    const alert = await this.alertController.create({
      header: "Jawaban Anda Benar",
      cssClass: "alert-true",
      buttons: [
        {
          text: "Penjelasan",
          cssClass: "buttonColor",
          handler: () => this.goToExplanation(id),
        },
        {
          text: "Selanjutnya",
          cssClass: "primary",
          handler: () => this.nextSlide(),
        },
      ],
      backdropDismiss: false,
    });
    await alert.present();
  }
  async presentFalse(id, answer) {
    const alert = await this.alertController.create({
      header: "Jawaban Anda Salah",
      cssClass: "alert-false",
      message: "Jawaban yang Benar :" + answer,
      buttons: [
        {
          text: "Penjelasan",

          cssClass: "buttonColor",
          handler: () => this.goToExplanation(id),
        },
        {
          text: "Selanjutnya",
          cssClass: "primary",
          handler: () => this.nextSlide(),
        },
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }
  async presentTimeout(id) {
    const alert = await this.alertController.create({
      header: "Waktu Anda Habis",
      cssClass: "alert-false",
      buttons: [
        {
          text: "Penjelasan",
          cssClass: "buttonColor",
          handler: () => this.goToExplanation(id),
        },
        {
          text: "Selanjutnya",
          cssClass: "primary",
          handler: () => this.nextSlide(),
        },
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }
}
