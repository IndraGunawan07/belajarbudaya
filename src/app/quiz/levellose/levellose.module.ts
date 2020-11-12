import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LevellosePageRoutingModule } from './levellose-routing.module';

import { LevellosePage } from './levellose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevellosePageRoutingModule
  ],
  declarations: [LevellosePage]
})
export class LevellosePageModule {}
