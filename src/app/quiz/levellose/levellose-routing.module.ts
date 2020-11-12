import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LevellosePage } from './levellose.page';

const routes: Routes = [
  {
    path: '',
    component: LevellosePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LevellosePageRoutingModule {}
