import { Component, OnInit } from '@angular/core';
import {Tour} from "../../tour.model";

@Component({
  selector: 'app-tour-guided',
  templateUrl: './tour-guided.page.html',
  styleUrls: ['./tour-guided.page.scss'],
})
export class TourGuidedPage implements OnInit {
    loadedTour: Tour;

  constructor() {

  }

  ngOnInit() {

  }

}
