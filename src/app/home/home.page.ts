import { Component } from '@angular/core';
import {TourDataService} from "../tour-data.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private toursService: TourDataService) { }

  onRefresh() {
      this.toursService.fetchTours();
  }

}
