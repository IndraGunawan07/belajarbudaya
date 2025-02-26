import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AngularFirestore, validateEventsArray } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validationsForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    email: [
      { type: 'required', message: 'Email is required,' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 6 characters long,' }
    ]
  };

  constructor(
    private authSrv: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  tryRegister(value) {
    this.presentLoading();
    this.authSrv.registerUser(value)
      .then(res => {
        this.errorMessage = '';
        this.successMessage = 'Your account has been created. Please log in.';
        this.firestore.collection('User').add({
          email: value.email,
          nama: value.email,
          tari: false,
          lagu: false,
          adat: false,
          rumah: false,
          wisata: false,
          makanan: false,
          currentLevel: '1',
          photoUrl: 'https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/defaultProfilePicture%2Fmandala.svg?alt=media&token=733bc956-613b-49f1-b81f-e039ac5a8040'
        });
        this.goLoginPage();
      }, err => {
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  goLoginPage() {
    this.router.navigateByUrl('/login');
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Adding contact...',
      duration: 1000
    });

    await loading.present();
  }

}
