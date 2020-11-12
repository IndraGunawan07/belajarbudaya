import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LevelClearPageRoutingModule } from './level-clear-routing.module';

import { LevelClearPage } from './level-clear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevelClearPageRoutingModule
  ],
  declarations: [LevelClearPage]
})
export class LevelClearPageModule {}
