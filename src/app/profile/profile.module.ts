import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { ProfilePage } from "./profile.page";
import { ProfilePageRoutingModule } from "./profile-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, ProfilePageRoutingModule],
  declarations: [ProfilePage],
})
export class ProfilePageModule {}
