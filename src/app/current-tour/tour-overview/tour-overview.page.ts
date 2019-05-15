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
      //this.loadedTour = this.currentTourService.currentTour;
  }

  ionViewWillEnter() {
      //TODO implement in current tour service
      /*this.toursService.fetchTours()
          .pipe(
              take(1)
              )
          .subscribe(tours => this.loadedTour = tours[0]);*/
      this.toursService.tours.subscribe(tours => this.loadedTour = tours[1]);
  }

    getMapViewLink() {
      let link = "https://www.google.com/maps/dir/";
      for(let stop of this.loadedTour.tourStop){
          link = link + stop.streetName + "+" + stop.streetNumber + "+" + stop.zip + "+" + stop.city + "/";
      }
      return link;
    }

    getNumberOfStopsLeft() {
      console.log(this.loadedTour);
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
          console.log(parcel);
          console.log(receiverID);
          if(parcel.receiverID === receiverID){
              if(parcel.isDelivered === false){
                  parcels.push(parcel);
              }
          }
      }
      return parcels;
    }

    getDepotParcelData(depotID){
      const parcels: Parcel[] = [];
      for(let parcel of this.loadedTour.parcelData) {
          if(parcel.depotID === depotID) {
              parcels.push(parcel);
          }
      }
      return parcels;
    }

    areParcelsLoaded(receiverID){
      for(let parcel of this.getParcelData(receiverID)){
          for(let stop of this.loadedTour.tourStop){
              if(parcel.depotID === stop.id){
                  if(stop.stopCompleted === false){
                      return true;
                  }
              }
          }

      }
      return false;
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

    getParcelsOfDepot(depotID){
      let parcels: Parcel[];
      parcels = this.getDepotParcelData(depotID);
      let parcelString: string = '';
      for(let parcel of parcels) {
          if(parcel.isDelivered === false){
              if(parcelString == ''){
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
