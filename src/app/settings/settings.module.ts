import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { TabsComponent } from "../tabs/tabs.component";
import { SettingsPage } from "./settings.page";
import { SettingsPageRoutingModule } from "./settings-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SettingsPageRoutingModule],
  declarations: [SettingsPage, TabsComponent],
})
export class SettingsPageModule {}
