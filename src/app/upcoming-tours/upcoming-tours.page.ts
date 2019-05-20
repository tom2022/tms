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

  constructor(private router: Router,
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

}
