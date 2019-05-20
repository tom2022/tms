import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpcomingToursPage } from './upcoming-tours.page';

const routes: Routes = [
  {
    path: '',
    component: UpcomingToursPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpcomingToursPage]
})
export class UpcomingToursPageModule {}
