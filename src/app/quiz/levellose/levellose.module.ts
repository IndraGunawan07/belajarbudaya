import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { LevellosePage } from "./levellose.page";
import { LevellosePageRoutingModule } from "./levellose-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LevellosePageRoutingModule],
  declarations: [LevellosePage],
})
export class LevellosePageModule {}
