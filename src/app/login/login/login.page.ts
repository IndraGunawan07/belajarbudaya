import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, ToastController } from "@ionic/angular";
import { AuthGuardService } from 'src/app/auth-guard.service';
import { AuthService } from "src/app/auth.service";
import { UtilsService } from "src/app/utils.service";

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
  disabledButton: boolean = false;

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
    private utilsSrv: UtilsService,
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
      () => {
        this.exist = true;
        this.errorMessage = "";
      },
      (err) => {
        this.exist = false;
        this.errorMessage = err.message;
      }
    );
    this.authSrv.getUser();

    setTimeout(() => {
      this.presentLoading(this.exist);
      setTimeout(() => {
        if (this.exist) {
          this.utilsSrv.playBackgroundMusic();
          this.router.navigateByUrl("/home");
        } else {
          this.disabledButton = false;
          this.router.navigateByUrl("/login");
        }
      }, 600);
    }, 800);
  }

  goToRegisterPage() {
    this.router.navigateByUrl("/register");
  }

  async presentToast(param: boolean) {
    if (param) {
      this.toast = await this.toastCtrl.create({
        message: "Signed In",
        duration: 2000,
        color: "success",
      });
    } else {
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
