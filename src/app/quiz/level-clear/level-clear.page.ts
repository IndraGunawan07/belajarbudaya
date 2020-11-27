import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { QuizappService } from 'src/app/quizapp.service';

@Component({
  selector: 'app-level-clear',
  templateUrl: './level-clear.page.html',
  styleUrls: ['./level-clear.page.scss'],
})
export class LevelClearPage implements OnInit {

  live: number;

  constructor(private quizService: QuizappService, private alertController: AlertController, private router: Router, private navigate: NavController) { }

  ngOnInit() {

  }
  ionViewDidEnter() {
    this.live = this.quizService.getLive();

    console.log(this.live);
  }

}
