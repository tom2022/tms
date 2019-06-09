import {Component, OnInit} from '@angular/core';
import {TourDataService} from "../tour-data.service";
import {Tour} from "../tour.model";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loadedTours: Tour[];

  constructor(private toursService: TourDataService) { }

  ngOnInit() {
      this.toursService.tours.subscribe(tours => this.loadedTours = tours);
  }

  onLoadData() {
      this.toursService.fetchTours().subscribe();
  }

  calculateProfits() {
      let price = 0;
      for (let tour of this.loadedTours) {
          price = (tour.price / 100) + price;
      }
      return price.toFixed(2);
  }

  getStopDay(date: string) {
      if (date !== undefined) {
          const day = (date.split('T')[0]).split('-');
          return day[2] + '.' + day[1] + '.' + day[0];
      }
  }

  getStopTime(date: string) {
      if (date !== undefined) {
          let d = date.split('T')[1];
          d =  d.split('Z')[0];
          return d.split(':')[0] + ':' + d.split(':')[1] + ' Uhr';
      }
  }

}
