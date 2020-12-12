import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-levellose',
  templateUrl: './levellose.page.html',
  styleUrls: ['./levellose.page.scss'],
})
export class LevellosePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  backToHome() {
    this.router.navigateByUrl("/home");
  }

}
