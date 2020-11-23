import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { AboutusPage } from "./aboutus.page";
import { AboutusPageRoutingModule } from "./aboutus-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AboutusPageRoutingModule],
  declarations: [AboutusPage],
})
export class AboutusPageModule {}
