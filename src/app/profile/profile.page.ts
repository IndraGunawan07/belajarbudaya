import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { UtilsService } from "../utils.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  constructor(
    private authSrv: AuthService,
    private utilsSrv: UtilsService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout() {
    this.authSrv.logoutUser();
    this.utilsSrv.stopBackgroundMusic();
    this.router.navigateByUrl("/login");
  }
}
