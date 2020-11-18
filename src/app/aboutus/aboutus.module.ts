import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { TabsComponent } from "../tabs/tabs.component";
import { AboutusPage } from "./aboutus.page";
import { AboutusPageRoutingModule } from "./aboutus-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AboutusPageRoutingModule],
  declarations: [AboutusPage, TabsComponent],
})
export class AboutusPageModule {}
