import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { TabsComponent } from "../tabs/tabs.component";

import { ProfilePage } from "./profile.page";
import { ProfilePageRoutingModule } from "./profile-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProfilePageRoutingModule],
  declarations: [ProfilePage, TabsComponent],
})
export class ProfilePageModule {}
