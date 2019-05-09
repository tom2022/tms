import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DepotHandoverPage } from './depot-handover.page';

const routes: Routes = [
  {
    path: '',
    component: DepotHandoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DepotHandoverPage]
})
export class DepotHandoverPageModule {}
