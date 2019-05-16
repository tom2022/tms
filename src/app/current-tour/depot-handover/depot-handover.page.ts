import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {Tour} from "../../tour.model";
import {TourDataService} from "../../tour-data.service";

@Component({
  selector: 'app-depot-handover',
  templateUrl: './depot-handover.page.html',
  styleUrls: ['./depot-handover.page.scss'],
})
export class DepotHandoverPage implements OnInit {
    parcelIDs: string;
    checkedParcels: string[] = [];
    submitButtonDisabled = false;
    loadedTour: Tour;

  constructor(
      private navCtrl: NavController,
      private route: ActivatedRoute,
      private toursService: TourDataService) { }

  ngOnInit() {
      this.parcelIDs = this.route.snapshot.paramMap.get('depotParcelIDs');
      this.checkedParcels = this.getParcels();
  }

    ionViewWillEnter() {
        this.toursService.tours.subscribe(tours => this.loadedTour = tours[0]);
    }

  onBack() {
    this.navCtrl.back();
  }

    getDepotName() {
        return this.getDepotInformation('name');
    }

    getDepotStreet() {
        return this.getDepotInformation('street');
    }

    getDepotCity() {
        return this.getDepotInformation('city');
    }

    getDepotId() {
      return this.getDepotInformation('id');
    }

    getDepotInformation(info) {
        for(let parcel of this.loadedTour.parcelData){
            if(this.getParcels()[0] === parcel.sscc){
                for(let stop of this.loadedTour.tourStop){
                    if(parcel.depotID === stop.id && stop.stopType === 'Depot'){
                        if(info === 'name'){
                            return stop.firstName + ' ' + stop.lastName
                        }
                        if(info === 'street'){
                            return stop.streetName + ' ' + stop.streetNumber
                        }
                        if(info === 'city'){
                            return stop.zip + ' ' + stop.city
                        }
                        if(info === 'id'){
                            return stop.id
                        }
                    }
                }
            }
        }
    }

    getParcels(){
        return this.parcelIDs.split("%");
    }

    updateParcel(e:any, parcel) {
      console.log(this.loadedTour.tourID);
        if(e.target.checked){
            this.checkedParcels.push(parcel);
            this.submitButtonDisabled = false;
        }
        else {
            this.checkedParcels = this.checkedParcels.filter(s => s !== parcel);
            }
        if(this.checkedParcels.length !== this.getParcels().length){
            this.submitButtonDisabled = true;
            }
    }


    onConfirmParcelHandover() {
      this.toursService.updateCompletedStops(this.loadedTour.tourID, this.getDepotId()).subscribe();
      for(let parcel of this.loadedTour.parcelData){
          const today = new Date();
          const d = today.toISOString();
          this.toursService.sendParcelDepotHandoverConfirmation(parcel, d);
      }
      this.onBack();
    }
}
