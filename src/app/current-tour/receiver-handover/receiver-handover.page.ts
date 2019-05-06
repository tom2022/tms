import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {CurrentTourService} from "../current-tour.service";

@Component({
  selector: 'app-receiver-handover',
  templateUrl: './receiver-handover.page.html',
  styleUrls: ['./receiver-handover.page.scss'],
})
export class ReceiverHandoverPage implements OnInit {
    myID;

  constructor(
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private currentTourService: CurrentTourService) { }

  ngOnInit() {
      this.myID = this.route.snapshot.paramMap.get('parcelID');
      console.log(this.myID);
  }

  onBackCurrentTourOverview() {
      this.navCtrl.back();
  }

}
