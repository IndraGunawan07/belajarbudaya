import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { UtilsService } from "../utils.service";
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  namaUser: FormGroup;
  counter = false;
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
  photoUrl: string;
  userList = [];

  oldName: string;

  

  constructor(
    private authSrv: AuthService,
    private utilsSrv: UtilsService,
    private router: Router,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.authSrv.getCurrentUser().subscribe((res) => {
      this.firestore
        .collection(`User`)
        .snapshotChanges()
        .subscribe((data) => {
          this.userList = data.map((e) => {
            if (res.email === e.payload.doc.data()["email"]) {
              this.idUser = e.payload.doc.id;
              this.oldName = e.payload.doc.data()["nama"];
              this.email = e.payload.doc.data()["email"];
              this.photoUrl = e.payload.doc.data()["photoUrl"];
              console.log(this.photoUrl);
            }
          });
        });
    });
  }

  logout() {
    this.authSrv.logoutUser();
    this.utilsSrv.stopBackgroundMusic();
    this.router.navigateByUrl("/login");
  }

  updateUser(form: NgForm, id){
    this.firestore.collection(`User`).doc(id).update({
      nama: form.value.nama
    });
    this.counter = false;
  }
}
