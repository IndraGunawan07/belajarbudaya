import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevelClearPage } from './level-clear.page';

const routes: Routes = [
  {
    path: '',
    component: LevelClearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevelClearPageRoutingModule {}
