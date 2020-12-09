import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AlertController, ToastController } from "@ionic/angular";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-medals",
  templateUrl: "./medals.page.html",
  styleUrls: ["./medals.page.scss"],
})
export class MedalsPage implements OnInit {
  medalIds: Array<string> = [];
  medals = new Map([]);
  idUser: string;
  toast: any = null;

  constructor(
    private authSrv: AuthService,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.authSrv.getCurrentUser().subscribe((res) => {
      this.firestore
        .collection(`User`)
        .snapshotChanges()
        .subscribe((userData) => {
          userData.map((e) => {
            if (res.email === e.payload.doc.data()["email"]) {
              this.idUser = e.payload.doc.id;
              this.medalIds = e.payload.doc.data()["medals"];

              this.firestore
                .collection(`Medal`)
                .snapshotChanges()
                .subscribe((medalData) => {
                  let iterator = 0;
                  medalData.forEach((e) => {
                    if (this.medalIds[iterator] === e.payload.doc.id) {
                      iterator++;
                      this.medals.set(
                        e.payload.doc.id,
                        e.payload.doc.data()["imageUrl"]
                      );
                    }
                  });
                });
            }
          });
        });
    });
  }

  changeMedalShow(num, id) {
    if (num === 1) {
      this.firestore.collection(`User`).doc(this.idUser).update({
        medal1: id,
      });
    } else if (num === 2) {
      this.firestore.collection(`User`).doc(this.idUser).update({
        medal2: id,
      });
    } else if (num === 3) {
      this.firestore.collection(`User`).doc(this.idUser).update({
        medal3: id,
      });
    } else return;
    this.presentToast();
  }

  async presentToast() {
    this.toast = await this.toastCtrl.create({
      message: "Medal has been changed",
      duration: 2000,
      color: "success",
    });

    this.toast.present();
  }

  async presentPopup(id: string) {
    const alert = await this.alertController.create({
      header: "Share medal",
      cssClass: "alert-update",
      buttons: [
        {
          text: "Profile Medal 1",
          cssClass: "primary",
          handler: () => this.changeMedalShow(1, id),
        },
        {
          text: "Profile Medal 2",
          cssClass: "primary",
          handler: () => this.changeMedalShow(2, id),
        },
        {
          text: "Profile Medal 3",
          cssClass: "primary",
          handler: () => this.changeMedalShow(3, id),
        },
      ],
    });
    await alert.present();
  }
}
