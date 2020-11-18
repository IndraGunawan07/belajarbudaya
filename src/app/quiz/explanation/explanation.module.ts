import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { TabsComponent } from "../../tabs/tabs.component";
import { ExplanationPage } from "./explanation.page";
import { ExplanationPageRoutingModule } from "./explanation-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplanationPageRoutingModule,
  ],
  declarations: [ExplanationPage, TabsComponent],
})
export class ExplanationPageModule {}
