import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalAlertComponent } from '../components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-level3',
  templateUrl: './level3.page.html',
  styleUrls: ['./level3.page.scss'],
})
export class Level3Page implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalAlertComponent,

    });

    // modal.onDidDismiss().then(resultData)
    return await modal.present();
  }
}
