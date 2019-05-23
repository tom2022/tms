import {Component, OnInit} from '@angular/core';
import {Tour} from "../../tour.model";
import {TourDataService} from "../../tour-data.service";
import {Parcel} from "../../parcel.model";
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx'
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";


@Component({
  selector: 'app-tour-overview',
  templateUrl: './tour-overview.page.html',
  styleUrls: ['./tour-overview.page.scss'],
})
export class TourOverviewPage implements OnInit {
    loadedTour: Tour;
    tourNumber: number;

  constructor(
      private toursService: TourDataService,
      private iab: InAppBrowser,
      private route: ActivatedRoute,
      ) { }

  ngOnInit() {
      this.tourNumber = +this.route.snapshot.paramMap.get('tourNumber');
  }

  ionViewWillEnter() {
      this.toursService.tours.subscribe(tours => this.loadedTour = tours[this.tourNumber]);
  }

    getMapViewLink() {
      let link = "https://www.google.com/maps/dir/";
      for(let stop of this.loadedTour.tourStop){
          link = link + stop.streetName + "+" + stop.streetNumber + "+" + stop.zip + "+" + stop.city + "/";
      }
      this.iab.create(link, '_system');
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
              if(parcel.isDelivered === false){
                  parcels.push(parcel);
              }
          }
      }
      return parcels;
    }

    getParcelWithoutPrefix(parcel: string){
        return parcel.split("sscc:")[1];
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

    getStopTime(date: string){
        if(date !== undefined){
            const d = date.split('T');
            return d[1].split('Z')[0] + ' Uhr';
        }
    }

    getNavigationLink(streetName, streetNumber, zip, city){
      const link = "https://www.google.com/maps/dir/?api=1&destination="
          + streetName + "+" + streetNumber + "+" +
          zip + "+" + city + "&dir_action=navigate";
        this.iab.create(link, '_system');
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
