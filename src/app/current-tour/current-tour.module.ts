import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentTourPage } from './current-tour.page';
import {CurrentTourRoutingModule} from "./current-tour-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentTourRoutingModule
  ],
  declarations: [CurrentTourPage]
})
export class CurrentTourPageModule {}
