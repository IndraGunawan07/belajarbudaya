import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { timeStamp } from 'console';
import { AuthService } from 'src/app/auth.service';
import { QuizappService } from 'src/app/quizapp.service';

@Component({
  selector: 'app-level-clear',
  templateUrl: './level-clear.page.html',
  styleUrls: ['./level-clear.page.scss'],
})
export class LevelClearPage implements OnInit {

  live: number;
  idUser: string;
  category: string;
  currentLevel: string;
  changeLevel: number;
  tari: boolean;
  musik: boolean;
  wisata: boolean;
  adat: boolean;
  makanan: boolean;
  rumah: boolean;

  constructor(private quizService: QuizappService, private alertController: AlertController, private router: Router, private navigate: NavController, private authSrv: AuthService, private firestore: AngularFirestore) { }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.category = this.quizService.getCategory();
    console.log('category: ', this.category);
    this.authSrv.getCurrentUser().subscribe(res => {
      this.firestore.collection(`User`).snapshotChanges().subscribe((data) => {
        data.map(e => {
          if (res.email === e.payload.doc.data()['email']) {
            this.idUser = e.payload.doc.id;
            this.currentLevel = e.payload.doc.data()['currentLevel'];
            this.tari = e.payload.doc.data()['tari'];
            this.musik = e.payload.doc.data()['musik'];
            this.rumah = e.payload.doc.data()['rumah'];
            this.adat = e.payload.doc.data()['adat'];
            this.makanan = e.payload.doc.data()['makanan'];
            this.wisata = e.payload.doc.data()['wisata'];
            this.changeLevel = Number(this.currentLevel);
          }
        });
      });
    });
    this.live = this.quizService.getLive();


  }
  checkCategory() {
    if (this.category === 'Makanan') {
      this.makanan = true;
      this.firestore.collection(`User`).doc(this.idUser).update({
        makanan: this.makanan,
      });
    }
    else if (this.category === 'Rumah Adat') {
      this.rumah = true;
      this.firestore.collection(`User`).doc(this.idUser).update({
        rumah: this.rumah,
      });
    }
    else if (this.category === 'Upacara Adat') {
      this.adat = true;
      this.firestore.collection(`User`).doc(this.idUser).update({
        adat: this.adat,
      });
    }
    else if (this.category === 'Tari') {
      this.tari = true;
      this.firestore.collection(`User`).doc(this.idUser).update({
        tari: this.tari,
      });
    }
    else if (this.category === 'Wisata') {
      this.wisata = true;
      this.firestore.collection(`User`).doc(this.idUser).update({
        wisata: this.wisata,
      });
    }
    else if (this.category === 'Musik') {
      this.musik = true;
      this.firestore.collection(`User`).doc(this.idUser).update({
        musik: this.musik,
      });
    }
  }
  backToHome() {

    this.checkCategory();
    if (this.makanan === true && this.musik === true && this.adat === true && this.rumah === true && this.wisata === true && this.tari === true) {
      this.changeLevel = this.changeLevel + 1;

      console.log('perubahan level ', this.changeLevel);
      this.quizService.updateCurrentLevel(this.idUser, this.changeLevel.toString());
    }

    this.router.navigateByUrl('/home');
  }

}
