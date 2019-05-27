import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {Tour} from "../tour.model";
import {TourDataService} from "../tour-data.service";

@Component({
  selector: 'app-upcoming-tours',
  templateUrl: './upcoming-tours.page.html',
  styleUrls: ['./upcoming-tours.page.scss'],
})
export class UpcomingToursPage implements OnInit {
  loadedTours: Tour[];

  constructor(
      private router: Router,
              private navCtrl: NavController,
              private toursService: TourDataService
              ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
      this.toursService.tours.subscribe(tours => this.loadedTours = tours);
  }

  onBackHome() {
      this.navCtrl.navigateBack('/home');
  }

  getTours(){
      return this.loadedTours;
  }

  getStopDay(date: string){
      if (date !== undefined && date !== null) {
          const day = (date.split('T')[0]).split('-');
          return day[2] + '.' + day[1] + '.' + day[0];
      }
  }

  getStopTime(date: string){
      if (date !== undefined && date !== null) {
          let d = date.split('T')[1];
          d =  d.split('Z')[0];
          return d.split(':')[0] + ':' + d.split(':')[1] + ' Uhr';
      }
  }

}
