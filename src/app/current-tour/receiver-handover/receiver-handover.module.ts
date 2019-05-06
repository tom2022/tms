import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReceiverHandoverPage } from './receiver-handover.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiverHandoverPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReceiverHandoverPage]
})
export class ReceiverHandoverPageModule {}
