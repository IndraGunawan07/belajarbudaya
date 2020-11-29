import { Component, OnInit } from "@angular/core";
import { UtilsService } from "../utils.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  musicVolume: number = 100;
  constructor(private utilsSrv: UtilsService) {
    this.musicVolume = this.utilsSrv.getMusicVolume();
  }

  ngOnInit() {}

  getProvince() {
    this.utilsSrv.getProvince();
  }

  setMusicVolume(value) {
    this.utilsSrv.setMusicVolume(value);
  }
}
