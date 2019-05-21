import { Component } from '@angular/core';
import {TourDataService} from "../tour-data.service";
import {Tour} from "../tour.model";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loadedTours: Tour[];

  constructor(private toursService: TourDataService) { }

    ionViewWillEnter() {
        this.toursService.tours.subscribe(tours => this.loadedTours = tours);
    }

    onLoadData() {
      this.toursService.fetchTours().subscribe();
    }

    calculateProfits() {
    let price = 0;
    for(let tour of this.loadedTours){
       price = (tour.price/100) + price;
      }
      return price.toFixed(2);
    }




}
