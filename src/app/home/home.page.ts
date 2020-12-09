import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides } from "@ionic/angular";
import { QuizappService } from "../quizapp.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "../auth.service";
import { UtilsService } from "../utils.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  @ViewChild("slideWithNav", { static: false }) slideWithNav: IonSlides;

  sliderOne: any;
  categoryData: any;
  slideOptions: any;
  carousel_data: any;
  userList = [];
  nama: string;
  email: string;
  currentLevel: string;

  idUser: string;
  tari: boolean;
  musik: boolean;
  wisata: boolean;
  adat: boolean;
  makanan: boolean;
  rumah: boolean;

  constructor(
    private quizService: QuizappService,
    private authSrv: AuthService,
    private firestore: AngularFirestore,
    private utilService: UtilsService
  ) {}

  ngOnInit() {
    this.slideOptions = {
      loop: true,
      slidesPerView: 1.6,
      spaceBetween: 10,
      centeredSlides: true,
    };
    this.quizService.getAllCategory().subscribe((data) => {
      this.categoryData = data.map((e) => {
        return {
          title: e.payload.doc.data()["category"],
          image: e.payload.doc.data()["imageUrl"],
        };
      });
    });
    this.utilService.getBanner().subscribe((data) => {
      this.sliderOne = data.map((e) => {
        return {
          id: e.payload.doc.id,
          imageURL: e.payload.doc.data()["imageURL"],
          description: e.payload.doc.data()["description"],
        };
      });
    });
  }

  ionViewDidEnter() {
    this.authSrv.getCurrentUser().subscribe((res) => {
      this.firestore
        .collection(`User`)
        .snapshotChanges()
        .subscribe((data) => {
          this.userList = data.map((e) => {
            if (res.email === e.payload.doc.data()["email"]) {
              this.idUser = e.payload.doc.id;
              this.nama = e.payload.doc.data()["nama"];
              this.email = e.payload.doc.data()["email"];
              this.currentLevel = e.payload.doc.data()["currentLevel"];
              this.tari = e.payload.doc.data()["tari"];
              this.musik = e.payload.doc.data()["musik"];
              this.rumah = e.payload.doc.data()["rumah"];
              this.adat = e.payload.doc.data()["adat"];
              this.makanan = e.payload.doc.data()["makanan"];
              this.wisata = e.payload.doc.data()["wisata"];
            }
          });
        });
    });
  }

  sendCategory(clickedCategory: string) {
    console.log(clickedCategory);
    this.quizService.setCategorynLevel(clickedCategory, this.currentLevel);
  }
}
