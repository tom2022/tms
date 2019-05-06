import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";
import {CurrentTourService} from "../current-tour.service";

@Component({
  selector: 'app-receiver-handover',
  templateUrl: './receiver-handover.page.html',
  styleUrls: ['./receiver-handover.page.scss'],
})
export class ReceiverHandoverPage implements OnInit {
    parcelIDs: string;

  constructor(
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private currentTourService: CurrentTourService) { }

  ngOnInit() {
      this.parcelIDs = this.route.snapshot.paramMap.get('parcelID');
  }

  onBackCurrentTourOverview() {
      this.navCtrl.back();
  }

  getParcels(){
      return this.parcelIDs.split("%");
  }

}
