import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-depot-handover',
  templateUrl: './depot-handover.page.html',
  styleUrls: ['./depot-handover.page.scss'],
})
export class DepotHandoverPage implements OnInit {

  constructor(
      private navCtrl: NavController) { }

  ngOnInit() {
  }

  onBackCurrentTourOverview() {
    this.navCtrl.back();
  }

}
