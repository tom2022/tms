import { Component, OnInit } from '@angular/core';
import {CurrentTourService} from "../current-tour.service";
import {Tour} from "../../tour.model";

@Component({
  selector: 'app-tour-guided',
  templateUrl: './tour-guided.page.html',
  styleUrls: ['./tour-guided.page.scss'],
})
export class TourGuidedPage implements OnInit {
    loadedTour: Tour;

  constructor(private currentTourService: CurrentTourService) {

  }

  ngOnInit() {
      this.loadedTour = this.currentTourService.currentTour;
  }

}
