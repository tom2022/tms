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

    getStopDay(date: string){
        if(date !== undefined){
            const day = (date.split('T')[0]).split('-');
            return day[2] + "." + day[1] + "." + day[0]
        }
    }

    getStopTime(date: string){
        if(date !== undefined){
            const d = date.split('T');
            return d[1].split('Z')[0] + ' Uhr';
        }
    }




}
