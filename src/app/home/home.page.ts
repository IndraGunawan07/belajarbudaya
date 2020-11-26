import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { QuizappService } from "../quizapp.service";
import { Howl, Howler } from "howler";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from '../auth.service';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  @ViewChild("slideWithNav", { static: false }) slideWithNav: IonSlides;

  sliderOne: any;
  categoryData: any;
  slideOptions = {
    loop: true,
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true,
  };
  carousel_data: any;
  userList = [];
  nama: string;
  email: string;
  currentLevel: string;
  tari: boolean;
  musik: boolean;
  wisata: boolean;
  adat: boolean;
  makanan: boolean;
  rumah: boolean;

  constructor(
    private quizService: QuizappService,
    private authSrv: AuthService,
    private firestore: AngularFirestore
    ) {
    this.sliderOne = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          image:
            "https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/imageBanner%2Ftana-toraja.jpg?alt=media&token=723c747d-16d8-4070-8334-a8fac9408d8d",
          id: "1",
        },
        {
          image:
            "https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/imageBanner%2Fraja-ampat.jpg?alt=media&token=b382495f-ac05-415f-b39b-3487572d4ccd",
          id: "2",
        },
        {
          image:
            "https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/imageBanner%2Fpulau-komodo.jpg?alt=media&token=dd9773c8-6522-4d81-aaed-6382a1e61adb",
          id: "3",
        },
      ],
    };
  }

  start() {
    var sound = new Howl({
      src: ["./assets/mp3/sound.mp3"],
      onplayerror: function () {
        sound.once("unlock", function () {
          sound.play();
        });
      },
    });

    sound.play();
  }

  ngOnInit() {
    this.quizService.getAllCategory().subscribe((data) => {
      this.categoryData = data.map((e) => {
        return {
          title: e.payload.doc.data()["category"],
          image: e.payload.doc.data()["imageUrl"],
        };
      });
    });
  }

  ionViewDidEnter(){
      this.authSrv.getCurrentUser().subscribe(res => {
        this.firestore.collection(`User`).snapshotChanges().subscribe((data) => {
          this.userList = data.map(e => {
           if (res.email === e.payload.doc.data()['email']){
             this.nama = e.payload.doc.data()['nama'];
             this.email = e.payload.doc.data()['email'];
             this.currentLevel = e.payload.doc.data()['currentLevel'];
             this.tari = e.payload.doc.data()['tari'];
             this.musik = e.payload.doc.data()['musik'];
             this.rumah = e.payload.doc.data()['rumah'];
             this.adat = e.payload.doc.data()['adat'];
             this.makanan = e.payload.doc.data()['makanan'];
             this.wisata = e.payload.doc.data()['wisata'];
           }
          });
        });
      });
  }

  sendCategory(clickedCategory: string) {
    console.log(clickedCategory);
    this.quizService.setCategory(clickedCategory);
  }
}
