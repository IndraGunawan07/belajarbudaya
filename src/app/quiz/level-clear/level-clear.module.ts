import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { TabsComponent } from "src/app/tabs/tabs.component";
import { LevelClearPage } from "./level-clear.page";
import { LevelClearPageRoutingModule } from "./level-clear-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevelClearPageRoutingModule,
  ],
  declarations: [LevelClearPage, TabsComponent],
})
export class LevelClearPageModule {}
