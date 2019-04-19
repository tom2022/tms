import { Component, OnInit } from '@angular/core';
import {CurrentTourService} from "../current-tour.service";
import {CurrentTour} from "../current-tour.model";
import {TourDataService} from "../../tour-data.service";

@Component({
  selector: 'app-tour-overview',
  templateUrl: './tour-overview.page.html',
  styleUrls: ['./tour-overview.page.scss'],
})
export class TourOverviewPage implements OnInit {
    loadedTour: CurrentTour;

  constructor(private currentTourService: CurrentTourService, private toursService: TourDataService) { }

  ngOnInit() {
      this.loadedTour = this.currentTourService.currentTour;
  }

  ionViewWillEnter() {
      this.toursService.fetchTours()
          .subscribe((data) => console.log(data));
  }

  /*reorderItems(indexes){
      console.log(indexes);
  }*/

}
