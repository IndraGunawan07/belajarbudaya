import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { AuthService } from "../auth.service";
import { UtilsService } from "../utils.service";

@Component({
  selector: "app-medals",
  templateUrl: "./medals.page.html",
  styleUrls: ["./medals.page.scss"],
})
export class MedalsPage implements OnInit {
  medals: Array<string> = [];
  medalsUrls: Array<string> = [];

  constructor(
    private authSrv: AuthService,
    private firestore: AngularFirestore
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
              this.medals = e.payload.doc.data()["medals"];

              this.firestore
                .collection(`Medal`)
                .snapshotChanges()
                .subscribe((medalData) => {
                  let iterator = 0;
                  medalData.forEach((e) => {
                    if (this.medals[iterator] === e.payload.doc.id) {
                      iterator++;
                      this.medalsUrls.push(e.payload.doc.data()["imageUrl"]);
                    }
                  });
                });
            }
          });
        });
    });
  }

  presentModal() {
    console.log("Pressed");
  }
}
