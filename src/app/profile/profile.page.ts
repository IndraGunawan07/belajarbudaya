import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { Router } from "@angular/router";
import { AlertController, Platform } from "@ionic/angular";
import { AuthService } from "../auth.service";
import { UtilsService } from "../utils.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Capacitor,
} from "@capacitor/core";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  @ViewChild("profilePic") profilePic: ElementRef;
  @ViewChild("medal1Pic") medal1Pic: ElementRef;
  @ViewChild("medal2Pic") medal2Pic: ElementRef;
  @ViewChild("medal3Pic") medal3Pic: ElementRef;
  @ViewChild("filePicker", { static: false })
  filePickerRef: ElementRef<HTMLInputElement>;
  photo: SafeResourceUrl;
  isDesktop: boolean;
  namaUser: FormGroup;
  counter = false;
  nama: string;
  email: string;
  currentLevel: string;
  idUser: string;
  photoUrl: string;
  medal1Url: string;
  medal2Url: string;
  medal3Url: string;
  oldName: string;
  medal1: string;
  medal2: string;
  medal3: string;

  constructor(
    private authSrv: AuthService,
    private utilsSrv: UtilsService,
    private router: Router,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (
      (this.platform.is("mobile") && this.platform.is("hybrid")) ||
      this.platform.is("desktop")
    ) {
      this.isDesktop = true;
    }
  }
  ionViewDidEnter() {
    this.authSrv.getCurrentUser().subscribe((res) => {
      this.firestore
        .collection(`User`)
        .snapshotChanges()
        .subscribe((userData) => {
          userData.map((e) => {
            if (res.email === e.payload.doc.data()["email"]) {
              this.idUser = e.payload.doc.id;
              this.oldName = e.payload.doc.data()["nama"];
              this.email = e.payload.doc.data()["email"];
              this.photoUrl = e.payload.doc.data()["photoUrl"];
              this.medal1 = e.payload.doc.data()["medal1"];
              this.medal2 = e.payload.doc.data()["medal2"];
              this.medal3 = e.payload.doc.data()["medal3"];

              this.profilePic.nativeElement.src = this.photoUrl;

              this.firestore
                .collection(`Medal`)
                .snapshotChanges()
                .subscribe((medalData) => {
                  medalData.map((e) => {
                    if (this.medal1 === e.payload.doc.id) {
                      this.medal1Url = e.payload.doc.data()["imageUrl"];
                      this.medal1Pic.nativeElement.src = this.medal1Url;
                    }
                    if (this.medal2 === e.payload.doc.id) {
                      this.medal2Url = e.payload.doc.data()["imageUrl"];
                      this.medal2Pic.nativeElement.src = this.medal2Url;
                    }
                    if (this.medal3 === e.payload.doc.id) {
                      this.medal3Url = e.payload.doc.data()["imageUrl"];
                      this.medal3Pic.nativeElement.src = this.medal3Url;
                    }
                  });
                });
            }
          });
        });
    });
  }

  async getPicture(type: "camera" | "gallery") {
    if (
      !Capacitor.isPluginAvailable("Camera") ||
      (this.isDesktop && type === "gallery")
    ) {
      this.filePickerRef.nativeElement.click();
      return;
    }

    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );

    const convertedImageFile = this.dataURLtoFile(
      image.dataUrl,
      `sample.${image.format}`
    );

    this.changeProfilePic(convertedImageFile);
  }

  onFileChoose(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      console.log("File format not supported");
      return;
    }

    reader.onload = () => {
      this.photo = reader.result.toString();
    };
    reader.readAsDataURL(file);

    this.changeProfilePic(file);
  }

  dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  changeProfilePic(file) {
    const path = `userProfile/${this.idUser}.jpg`;
    const fileRef = this.storage.ref(path);

    this.storage
      .upload(path, file)
      .snapshotChanges()
      .pipe(
        finalize(() =>
          fileRef.getDownloadURL().subscribe(
            (res) => {
              this.firestore.collection(`User`).doc(this.idUser).update({
                photoUrl: res,
              });
            },
            (err) => console.log(err)
          )
        )
      )
      .subscribe();
  }

  async presentPopup() {
    const alert = await this.alertController.create({
      header: "Update profile picture",
      cssClass: "alert-update",
      buttons: [
        {
          text: "Kamera",
          cssClass: "primary",
          handler: () => this.getPicture("camera"),
        },
        {
          text: "Galeri",
          cssClass: "primary",
          handler: () => this.getPicture("gallery"),
        },
      ],
    });
    await alert.present();
  }

  logout() {
    this.authSrv.logoutUser();
    this.utilsSrv.stopBackgroundMusic();
    this.router.navigateByUrl("/login");
  }

  updateUser(form: NgForm, id) {
    if (form.value.nama.trim() && form.value.nama.trim() !== this.oldName) {
      this.firestore.collection(`User`).doc(id).update({
        nama: form.value.nama,
      });
    }
    this.counter = false;
  }
}
