import { Component, OnInit, ViewChild } from "@angular/core";
import { AlertController, IonSlides } from "@ionic/angular";
import { QuizappService } from "../quizapp.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "../auth.service";
import { UtilsService } from "../utils.service";
// import { timeStamp } from 'console';
import { Router } from "@angular/router";

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
  lagu: boolean;
  wisata: boolean;
  adat: boolean;
  makanan: boolean;
  rumah: boolean;
  region: string;

  test = false;

  constructor(
    private quizService: QuizappService,
    private authSrv: AuthService,
    private firestore: AngularFirestore,
    private utilService: UtilsService,
    private alertController: AlertController,
    private router: Router,
  ) { }

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
    this.region = this.utilService.getProvince();


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
              this.lagu = e.payload.doc.data()["lagu"];
              this.rumah = e.payload.doc.data()["rumah"];
              this.adat = e.payload.doc.data()["adat"];
              this.makanan = e.payload.doc.data()["makanan"];
              this.wisata = e.payload.doc.data()["wisata"];
            }
          });
        });
    });
  }

  sendCategory(clickedCategory, makanan, tari, lagu, rumah, adat, wisata) {
    if (this.region == null) {
      this.presentRegion();
    }
    switch (clickedCategory) {
      case 'Makanan':
        if (makanan === true) {
          this.presentDone()
        }
        else {
          this.quizService.setCategorynLevel(clickedCategory, this.currentLevel);
        }
        break;
      case 'Lagu':
        if (lagu === true) {
          this.presentDone()
        }
        else {
          this.quizService.setCategorynLevel(clickedCategory, this.currentLevel);
        }
        break;
      case 'Tari':
        if (tari === true) {
          this.presentDone()

        }
        else {
          this.quizService.setCategorynLevel(clickedCategory, this.currentLevel);

        }
        break;
      case 'Rumah Adat':
        if (rumah === true) {
          this.presentDone()

        }
        else {
          this.quizService.setCategorynLevel(clickedCategory, this.currentLevel);

        }
        break;
      case 'Upacara Adat':
        if (adat === true) {
          this.presentDone()

        }
        else {
          this.quizService.setCategorynLevel(clickedCategory, this.currentLevel);
        }
        break;
      case 'Wisata':
        if (wisata === true) {
          this.presentDone()

        }
        else {
          this.quizService.setCategorynLevel(clickedCategory, this.currentLevel);
        }
        break;

    }


  }
  goToSetting() {
    this.router.navigateByUrl('/settings');
  }
  async presentRegion() {
    const alert = await this.alertController.create({
      header: "Silakan mengatur lokasi Anda sekarang!",
      cssClass: "alert-done",
      buttons: [
        {
          text: "Settings",
          cssClass: "",
          handler: () => this.goToSetting(),
        }
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }


  async presentDone() {

    const alert = await this.alertController.create({
      header: "Anda Sudah Menyelesaikan Kategori ini! Silahkan pilih kategori lain",
      cssClass: "alert-done",
      buttons: [
        'OK'
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }
}
