import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-fail',
  templateUrl: './modal-fail.component.html',
  styleUrls: ['./modal-fail.component.scss'],
})
export class ModalFailComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

}
