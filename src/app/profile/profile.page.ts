import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  constructor(
    private authSrv: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  logout(){
    console.log('keluar');
    this.authSrv.logoutUser();
    this.router.navigateByUrl('/login');
  }
}
