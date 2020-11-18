import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { TabsComponent } from "src/app/tabs/tabs.component";
import { Level3Page } from "./level3.page";
import { Level3PageRoutingModule } from "./level3-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, Level3PageRoutingModule],
  declarations: [Level3Page, TabsComponent],
})
export class Level3PageModule {}
