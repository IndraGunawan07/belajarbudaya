import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, ToastController } from "@ionic/angular";
import { AuthService } from "src/app/auth.service";
import { Howl } from "howler";


@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  validationsForm: FormGroup;
  errorMessage: string = "";
  exist: boolean = true;
  toast: any = null;

  validation_messages = {
    email: [
      { type: "required", message: "Email is required," },
      { type: "pattern", message: "Enter a valid email." },
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 6 characters long.",
      },
    ],
  };

  constructor(
    private authSrv: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }

  loginUser(value) {
    this.authSrv.loginUser(value).then(
      (res) => {
        console.log(res);
        this.exist = true;
        this.errorMessage = "";
      },
      (err) => {
        this.exist = false;
        this.errorMessage = err.message;
      }
    );
    setTimeout(() => {
      this.presentLoading(this.exist);
      setTimeout(() => {
        if (this.exist){
          this.router.navigateByUrl("/home");
        }
        else{
          this.router.navigateByUrl("/login");
        }
        const sound = new Howl({
          src: ['./assets/mp3/sample.mp3']
        });
        sound.play();
      }, 1200);
    }, 1000);
  }

  goToRegisterPage() {
    this.router.navigateByUrl("/register");
  }

  async presentToast(param: boolean) {
    if (param){
      this.toast = await this.toastCtrl.create({
        message: "Signed In",
        duration: 2000,
        color: "success",
      });
    }
    else{
      this.toast = await this.toastCtrl.create({
        message: "Email or password is wrong",
        duration: 2000,
        color: "danger",
      });
    }
    this.toast.present();
    this.validationsForm.reset();
  }

  async presentLoading(param: boolean) {
    const loading = await this.loadingCtrl.create({
      message: "Signing in...",
      duration: 500,
    });

    await loading.present();
    setTimeout(() => {
      this.presentToast(param);
    }, 1200);
  }
}
