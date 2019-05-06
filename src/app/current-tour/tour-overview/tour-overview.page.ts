import {Component, OnInit} from '@angular/core';
import {CurrentTourService} from "../current-tour.service";
import {Tour} from "../../tour.model";
import {TourDataService} from "../../tour-data.service";
import {Parcel} from "../../parcel.model";


@Component({
  selector: 'app-tour-overview',
  templateUrl: './tour-overview.page.html',
  styleUrls: ['./tour-overview.page.scss'],
})
export class TourOverviewPage implements OnInit {
    loadedTour: Tour;

  constructor(private currentTourService: CurrentTourService, private toursService: TourDataService) { }

  ngOnInit() {
      this.loadedTour = this.currentTourService.currentTour;
  }

  ionViewWillEnter() {
      //TODO implement in current tour service
      /*this.toursService.fetchTours()
          .subscribe((data) => console.log(data));*/
  }

    getNumberOfStopsLeft() {
      let counter = 0;
      for(let stop of this.loadedTour.tourStop) {
          if(stop.stopCompleted === false){
              counter++;
          }
      }
      counter = this.loadedTour.numberOfStops - counter;
      return counter;
    }

    getParcelData(receiverID){
      const parcels: Parcel[] = [];
      for(let parcel of this.loadedTour.parcelData) {
          if(parcel.receiverID === receiverID){
              parcels.push(parcel);
          }
      }
      return parcels;
    }

    isParcelLoaded(depotID){
      for(let stop of this.loadedTour.tourStop) {
          if(stop.id === depotID){
              return stop.stopCompleted !== false;
          }
      }
    }

    getNavigationLink(streetName, streetNumber, zip, city){
      return "https://www.google.com/maps/dir/?api=1&destination="
          + streetName + "+" + streetNumber + "+" +
          zip + "+" + city + "&dir_action=navigate";
    }

    getUndeliveredParcelsOfStop(receiverID){
      let parcels: Parcel[];
      parcels = this.getParcelData(receiverID);
      let parcelString: string = '';
      for(let parcel of parcels){
          if(parcel.isDelivered === false ){
              if (parcelString == ''){
                  parcelString = parcel.sscc;
              }
              else {
                  parcelString = parcelString + '%' + parcel.sscc;
              }
          }
      }
      return parcelString;
    }
}
