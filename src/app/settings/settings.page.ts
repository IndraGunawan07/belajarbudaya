import { Component, OnInit } from "@angular/core";
import { UtilsService } from "../utils.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  constructor(private utilsSrv: UtilsService) {}

  ngOnInit() {}

  getProvince() {
    this.utilsSrv.getProvince();
  }
}
